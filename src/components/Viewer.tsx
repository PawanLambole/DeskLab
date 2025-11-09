import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Eye, PhoneOff } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface ViewerProps {
  onBack: () => void;
}

const SOCKET_URL = 'http://localhost:3001';

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

export default function Viewer({ onBack }: ViewerProps) {
  const [roomId, setRoomId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState('Enter a room ID to connect');

  const socketRef = useRef<Socket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  const connect = async () => {
    if (!roomId.trim()) {
      setStatus('⚠️ Please enter a room ID');
      return;
    }

    try {
      setStatus('🔗 Connecting to room...');

      socketRef.current = io(SOCKET_URL);

      socketRef.current.on('connect', () => {
        setStatus('✅ Connected to server');
        socketRef.current?.emit('join-room', { roomId: roomId.trim(), role: 'viewer' });
      });

      socketRef.current.on('host-joined', async () => {
        setStatus('🎬 Host detected, establishing connection...');
        await createPeerConnection(true);
      });

      socketRef.current.on('signal', async ({ signal, from }) => {
        if (!peerConnectionRef.current) {
          await createPeerConnection(false);
        }

        const pc = peerConnectionRef.current;

        if (signal.type === 'offer') {
          await pc?.setRemoteDescription(new RTCSessionDescription(signal));
          const answer = await pc?.createAnswer();
          await pc?.setLocalDescription(answer);
          socketRef.current?.emit('signal', {
            roomId: roomId.trim(),
            signal: answer,
            to: from
          });
        } else if (signal.type === 'answer') {
          await pc?.setRemoteDescription(new RTCSessionDescription(signal));
        } else if (signal.candidate) {
          await pc?.addIceCandidate(new RTCIceCandidate(signal));
        }
      });

      socketRef.current.on('host-disconnected', () => {
        setStatus('❌ Host disconnected');
        disconnect();
      });

    } catch (error) {
      console.error('Error connecting:', error);
      setStatus('❌ Failed to connect. Please try again.');
    }
  };

  const createPeerConnection = async (isInitiator: boolean) => {
    const peerConnection = new RTCPeerConnection(ICE_SERVERS);

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current?.emit('signal', {
          roomId: roomId.trim(),
          signal: { candidate: event.candidate }
        });
      }
    };

    peerConnection.ontrack = (event) => {
      setStatus('🎥 Receiving stream...');
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
        setIsConnected(true);
        setStatus(`✅ Connected to room: ${roomId.trim()}`);
      }
    };

    peerConnection.onconnectionstatechange = () => {
      if (peerConnection.connectionState === 'disconnected' ||
          peerConnection.connectionState === 'failed' ||
          peerConnection.connectionState === 'closed') {
        setStatus('❌ Connection lost');
        disconnect();
      }
    };

    peerConnectionRef.current = peerConnection;

    if (isInitiator) {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socketRef.current?.emit('signal', {
        roomId: roomId.trim(),
        signal: offer
      });
    }
  };

  const disconnect = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    setIsConnected(false);
    setStatus('Enter a room ID to connect');

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-gradient-to-br from-green-50 to-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={isConnected ? disconnect : onBack}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{isConnected ? 'Disconnect & Go Back' : 'Back to Home'}</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <Eye className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">View Shared Screen</h2>
              <p className="text-gray-600">Connect to a host's screen</p>
            </div>
          </div>

          {!isConnected ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Room ID
                </label>
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter the host's room ID"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  onKeyPress={(e) => e.key === 'Enter' && connect()}
                />
              </div>

              <button
                onClick={connect}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                Connect to Host
              </button>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  💡 <strong>Tip:</strong> Ask the host for their room ID to start viewing their screen.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-green-800">Viewing Live</span>
                </div>
                <p className="text-sm text-gray-700">
                  <strong>Room ID:</strong> {roomId.trim()}
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              <button
                onClick={disconnect}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <PhoneOff className="w-5 h-5" />
                Disconnect
              </button>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Status:</strong> {status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
