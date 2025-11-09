import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Monitor, Users, PhoneOff } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface HostProps {
  onBack: () => void;
}

const SOCKET_URL = 'http://localhost:3001';

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

export default function Host({ onBack }: HostProps) {
  const [roomId, setRoomId] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [viewersCount, setViewersCount] = useState(0);
  const [status, setStatus] = useState('Enter a room ID to start sharing');

  const socketRef = useRef<Socket | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map());
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    return () => {
      stopSharing();
    };
  }, []);

  const startSharing = async () => {
    if (!roomId.trim()) {
      setStatus('⚠️ Please enter a room ID');
      return;
    }

    try {
      setStatus('🎬 Requesting screen access...');

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: 'always'
        },
        audio: false
      });

      localStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      stream.getVideoTracks()[0].onended = () => {
        stopSharing();
      };

      socketRef.current = io(SOCKET_URL);

      socketRef.current.on('connect', () => {
        setStatus('🔗 Connected to server');
        socketRef.current?.emit('join-room', { roomId: roomId.trim(), role: 'host' });
        setIsSharing(true);
        setStatus(`✅ Sharing screen in room: ${roomId.trim()}`);
      });

      socketRef.current.on('viewer-joined', async ({ viewerId }) => {
        setStatus('👀 New viewer connecting...');
        await createPeerConnection(viewerId, true);
        setViewersCount(prev => prev + 1);
        setStatus(`✅ Viewer connected (${viewersCount + 1} watching)`);
      });

      socketRef.current.on('signal', async ({ signal, from }) => {
        const peerConnection = peerConnectionsRef.current.get(from);

        if (!peerConnection) {
          await createPeerConnection(from, false);
        }

        const pc = peerConnectionsRef.current.get(from);

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

      socketRef.current.on('viewer-disconnected', () => {
        setViewersCount(prev => Math.max(0, prev - 1));
      });

    } catch (error) {
      console.error('Error starting screen share:', error);
      setStatus('❌ Failed to access screen. Please try again.');
    }
  };

  const createPeerConnection = async (peerId: string, isInitiator: boolean) => {
    const peerConnection = new RTCPeerConnection(ICE_SERVERS);

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStreamRef.current!);
      });
    }

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current?.emit('signal', {
          roomId: roomId.trim(),
          signal: { candidate: event.candidate },
          to: peerId
        });
      }
    };

    peerConnectionsRef.current.set(peerId, peerConnection);

    if (isInitiator) {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socketRef.current?.emit('signal', {
        roomId: roomId.trim(),
        signal: offer,
        to: peerId
      });
    }
  };

  const stopSharing = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }

    peerConnectionsRef.current.forEach(pc => pc.close());
    peerConnectionsRef.current.clear();

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    setIsSharing(false);
    setViewersCount(0);
    setStatus('Enter a room ID to start sharing');

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-gradient-to-br from-blue-50 to-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={isSharing ? stopSharing : onBack}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{isSharing ? 'Stop & Go Back' : 'Back to Home'}</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 rounded-full p-3">
              <Monitor className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Host Screen Sharing</h2>
              <p className="text-gray-600">Share your screen with others</p>
            </div>
          </div>

          {!isSharing ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Room ID
                </label>
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter a room ID (e.g., room123)"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  onKeyPress={(e) => e.key === 'Enter' && startSharing()}
                />
              </div>

              <button
                onClick={startSharing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Monitor className="w-5 h-5" />
                Start Sharing Screen
              </button>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Choose a unique room ID and share it with viewers who want to watch your screen.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-green-800">Live</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">{viewersCount} watching</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  <strong>Room ID:</strong> {roomId.trim()}
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-contain"
                />
              </div>

              <button
                onClick={stopSharing}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <PhoneOff className="w-5 h-5" />
                Stop Sharing
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
