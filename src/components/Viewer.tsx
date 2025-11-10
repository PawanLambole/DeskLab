import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Eye, PhoneOff } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface ViewerProps {
  onBack: () => void;
}

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

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
  const [remoteControlActive, setRemoteControlActive] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

    // Handle data channel for remote control
    peerConnection.ondatachannel = (event) => {
      dataChannelRef.current = event.channel;
      event.channel.onopen = () => {
        console.log('Data channel opened');
        setRemoteControlActive(true);
      };
      event.channel.onclose = () => {
        console.log('Data channel closed');
        setRemoteControlActive(false);
      };
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

  const sendRemoteControlMessage = (message: any) => {
    if (dataChannelRef.current && dataChannelRef.current.readyState === 'open') {
      dataChannelRef.current.send(JSON.stringify(message));
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLVideoElement>) => {
    if (!videoRef.current) return;
    
    const rect = videoRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    sendRemoteControlMessage({
      type: 'mousemove',
      x: x,
      y: y,
    });
  };

  const handleMouseClick = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.preventDefault();
    
    let button: 'left' | 'right' | 'middle' = 'left';
    if (e.button === 2) button = 'right';
    else if (e.button === 1) button = 'middle';

    sendRemoteControlMessage({
      type: 'mouseclick',
      button: button,
      double: e.detail === 2,
    });
  };

  const handleWheel = (e: React.WheelEvent<HTMLVideoElement>) => {
    e.preventDefault();
    
    sendRemoteControlMessage({
      type: 'mousescroll',
      deltaX: Math.round(e.deltaX / 100),
      deltaY: Math.round(e.deltaY / 100),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLVideoElement>) => {
    e.preventDefault();
    
    const modifiers: string[] = [];
    if (e.ctrlKey) modifiers.push('control');
    if (e.shiftKey) modifiers.push('shift');
    if (e.altKey) modifiers.push('alt');
    if (e.metaKey) modifiers.push('command');

    sendRemoteControlMessage({
      type: 'keypress',
      key: e.key.toLowerCase(),
      modifiers: modifiers.length > 0 ? modifiers : undefined,
    });
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
                {remoteControlActive && (
                  <p className="text-xs text-green-600 mt-2">
                    🎮 Remote control enabled - Click and interact with the screen!
                  </p>
                )}
              </div>

              <div 
                ref={containerRef}
                className="bg-gray-900 rounded-lg overflow-hidden aspect-video cursor-pointer"
                tabIndex={0}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  className="w-full h-full object-contain"
                  onMouseMove={handleMouseMove}
                  onClick={handleMouseClick}
                  onContextMenu={(e) => { e.preventDefault(); handleMouseClick(e); }}
                  onWheel={handleWheel}
                  onKeyDown={handleKeyDown}
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
