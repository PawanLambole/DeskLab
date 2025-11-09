# ⚡ BoltDesk – Browser Remote Screen Share

A lightweight, browser-based screen sharing system built with WebRTC, React, and Node.js. Share your screen in real-time with anyone, anywhere.

## 🧩 Tech Stack

- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + Socket.io
- **Communication**: WebRTC (peer-to-peer screen streaming)
- **UI Icons**: Lucide React

## 📂 Project Structure

```
project/
├── server/
│   └── server.js          # Socket.io signalling server
├── src/
│   ├── components/
│   │   ├── Navbar.tsx     # App header
│   │   ├── Home.tsx       # Landing page with Host/Viewer selection
│   │   ├── Host.tsx       # Screen sharing (host) page
│   │   └── Viewer.tsx     # Stream viewing page
│   ├── App.tsx            # Main app with routing logic
│   └── main.tsx           # App entry point
└── package.json
```

## 🚀 Installation

1. **Install dependencies**:
```bash
npm install
```

## 🎯 Running the Application

You need to run **two processes** simultaneously:

### Terminal 1: Start the Signalling Server
```bash
npm run server
```
This starts the Socket.io server on `http://localhost:3001`

### Terminal 2: Start the React Frontend
```bash
npm run dev
```
This starts the Vite dev server (typically on `http://localhost:5173`)

## 💡 How to Use

### As a Host (Screen Sharer):
1. Open the app in your browser
2. Click **"Host"** button
3. Enter a unique Room ID (e.g., `room123`)
4. Click **"Start Sharing Screen"**
5. Grant screen sharing permission when prompted
6. Share your Room ID with viewers

### As a Viewer:
1. Open the app in a different browser tab/window
2. Click **"Viewer"** button
3. Enter the Host's Room ID
4. Click **"Connect to Host"**
5. You'll see the host's screen in real-time!

## 🔧 How It Works

### 1. Signalling Server (server/server.js)
- Manages WebRTC signalling via Socket.io
- Routes SDP offers/answers and ICE candidates between peers
- Handles room management (join/leave events)
- No media data passes through the server (peer-to-peer)

### 2. WebRTC Flow

**Host Side:**
1. Captures screen using `navigator.mediaDevices.getDisplayMedia()`
2. Creates `RTCPeerConnection` with STUN servers
3. Generates SDP offer and sends via Socket.io
4. Exchanges ICE candidates with viewer
5. Streams video directly to viewer's browser

**Viewer Side:**
1. Joins room via Socket.io
2. Receives SDP offer from host
3. Creates SDP answer and sends back
4. Exchanges ICE candidates
5. Receives remote video stream and displays in `<video>` element

### 3. Key Events

**Socket.io Events:**
- `join-room`: User joins with roomId and role (host/viewer)
- `signal`: Exchange of WebRTC signals (SDP/ICE)
- `viewer-joined`: Notifies host when viewer connects
- `host-disconnected`: Notifies viewers when host leaves

## 🌐 Features

✅ Real-time screen sharing using WebRTC
✅ Simple room-based connections (no authentication)
✅ Multiple viewers can watch same host
✅ Clean, modern UI with Tailwind CSS
✅ Automatic disconnect handling
✅ Live status updates
✅ Viewer count display for hosts

## 🔒 Important Notes

- **Local Network**: Works on localhost and LAN
- **HTTPS Required**: For production deployment, HTTPS is required for `getDisplayMedia()`
- **STUN Servers**: Uses Google's public STUN servers for NAT traversal
- **No Recording**: Stream data is peer-to-peer, not stored anywhere
- **No Authentication**: Anyone with Room ID can join

## 🛠️ Customization

### Change Socket Server URL:
In `src/components/Host.tsx` and `src/components/Viewer.tsx`:
```typescript
const SOCKET_URL = 'http://localhost:3001';
```

### Change Server Port:
In `server/server.js`:
```javascript
const PORT = process.env.PORT || 3001;
```

### Add TURN Servers:
For better connectivity through firewalls, add TURN servers in both components:
```typescript
const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    {
      urls: 'turn:your-turn-server.com',
      username: 'username',
      credential: 'password'
    }
  ]
};
```

## 📝 Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

## 🐛 Troubleshooting

**Screen sharing permission denied:**
- Grant permission in browser settings
- Make sure you're on localhost or HTTPS

**Cannot connect to host:**
- Ensure signalling server is running
- Check that both users use the same Room ID
- Verify firewall/network settings

**No video showing:**
- Check browser console for errors
- Ensure host is actively sharing screen
- Try refreshing both browser tabs

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

Built with ❤️ using React, WebRTC, and Socket.io
