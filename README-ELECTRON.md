# DeskLab - Electron Desktop Application

## 🚀 Quick Start

### Development Mode

Run the Electron app in development mode (includes signalling server):

```bash
npm run dev:electron
```

This will start:
1. Vite dev server (React frontend) on `http://localhost:5173`
2. Socket.IO signalling server on `http://localhost:3001`
3. Electron desktop app window

### Individual Components

Start just the web frontend:
```bash
npm run dev
```

Start just the signalling server:
```bash
npm run server
```

Start just Electron (after frontend is running):
```bash
npm run electron:dev
```

## 📦 Building for Production

### Build for your current platform:
```bash
npm run build
```

### Build platform-specific installers:

**Windows:**
```bash
npm run build:win
```

**macOS:**
```bash
npm run build:mac
```

**Linux:**
```bash
npm run build:linux
```

Installers will be created in the `release/` directory.

## 🏗️ Project Structure

```
DeskLab/
├── electron/              # Electron main process
│   ├── main.ts           # Main process entry point
│   └── preload.ts        # Preload script (IPC bridge)
├── src/                  # React frontend (renderer process)
│   ├── components/
│   ├── App.tsx
│   └── main.tsx
├── server/               # Socket.IO signalling server
│   └── server.js
├── dist/                 # Built React app
├── dist-electron/        # Built Electron files
└── release/              # Built installers
```

## 🔧 Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_SOCKET_URL=http://localhost:3001
NODE_ENV=development
```

## 🎯 Next Steps

- [ ] Implement native screen capture with desktopCapturer
- [ ] Add remote control (mouse/keyboard)
- [ ] Add system audio capture
- [ ] Add end-to-end encryption
- [ ] Add auto-updater
- [ ] Add application signing for Windows/Mac

## 📝 Development Notes

### Electron + React Communication

The app uses IPC (Inter-Process Communication) for secure communication between Electron and React:

- `electron/preload.ts` - Exposes safe APIs to renderer
- `window.electronAPI` - Available in React components
- Context isolation enabled for security

### Available APIs in React:

```typescript
// Check if running in Electron
const isElectron = await window.electronAPI?.isElectron();

// Get available screens/windows
const sources = await window.electronAPI?.getSources();

// Get app version
const version = await window.electronAPI?.getVersion();

// Get platform
const platform = window.electronAPI?.platform; // 'win32', 'darwin', 'linux'
```

## 🐛 Troubleshooting

**Electron window doesn't open:**
- Make sure Vite dev server is running on port 5173
- Check console for errors

**Build fails:**
- Run `npm run build` separately to see errors
- Ensure all TypeScript errors are fixed

**Can't share screen:**
- Electron has better screen capture APIs than browser
- Use `window.electronAPI.getSources()` instead of `getDisplayMedia()`
