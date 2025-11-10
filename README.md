# 🖥️ DeskLab - Remote Desktop Sharing

**AnyDesk-like remote desktop application with automatic updates**

A modern, Electron-based screen sharing and remote control application with full auto-update support via GitHub Releases.

---

## ✨ Features

### **Core Features:**
- 🖥️ **Screen Sharing** - Share full screen or specific windows
- 🖱️ **Remote Control** - Control remote PC (mouse, keyboard, scroll)
- 🌐 **P2P Connection** - Direct WebRTC peer-to-peer streaming
- 🔒 **Secure** - Context isolation, encrypted connections
- 📱 **Multi-Monitor** - Select which screen to share
- 🎯 **Room Codes** - Simple 6-digit connection codes

### **Auto-Update System (NEW!):**
- 🔄 **Automatic Updates** - Checks GitHub Releases on startup
- 📥 **One-Click Install** - Download and install with 2 clicks
- 📊 **Progress Tracking** - Real-time download progress
- 🔔 **Notifications** - Beautiful update prompts
- 🔐 **Secure** - SHA512 hash verification
- 🚀 **Seamless** - App restarts automatically after update

---

## 🚀 Quick Start

### **For Users:**

**Download:** Get the latest version from [GitHub Releases](https://github.com/PawanLambole/DeskLab/releases)

**Install:** Run `DeskLab Setup 1.0.0.exe`

**Use:**
- **Host:** Share your screen → Get room code → Share with viewer
- **Viewer:** Enter room code → Connect → See host's screen

**Updates:** App automatically notifies when new versions are available!

### **For Developers:**

```powershell
# Clone repository
git clone https://github.com/PawanLambole/DeskLab.git
cd DeskLab

# Install dependencies
npm install

# Run in development mode
npm run dev:electron

# Build for production
npm run build:win
```

---

## 📚 Documentation

**Start here:** [DOCUMENTATION-INDEX.md](DOCUMENTATION-INDEX.md) - Complete guide to all docs

### **Auto-Update Guides:**
- 📄 [README-AUTO-UPDATE.md](README-AUTO-UPDATE.md) - Auto-update overview
- 📄 [AUTO-UPDATE-QUICK-START.md](AUTO-UPDATE-QUICK-START.md) - 15-minute testing guide
- 📄 [AUTO-UPDATE-GUIDE.md](AUTO-UPDATE-GUIDE.md) - Complete implementation details
- 📄 [AUTO-UPDATE-VISUAL.txt](AUTO-UPDATE-VISUAL.txt) - Visual reference

### **Deployment Guides:**
- 📄 [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) - Distribution strategies
- 📄 [TESTING-OPTIONS.md](TESTING-OPTIONS.md) - Testing on different PCs
- 📄 [PROJECT-STATUS.md](PROJECT-STATUS.md) - Current feature status

---

## 🔄 Releasing Updates

### **Simple 3-Step Process:**

#### **1. Build New Version**
```powershell
# Update version in package.json: "1.0.0" → "1.0.1"
npm run build:win
```

#### **2. Create GitHub Release**
- Go to: https://github.com/PawanLambole/DeskLab/releases
- Tag: `v1.0.1`
- Upload: `DeskLab Setup 1.0.1.exe` + `latest.yml`
- Publish!

#### **3. Users Get Auto-Update!**
- App notifies users of new version
- One click to download
- One click to install
- Seamless restart

**See:** [AUTO-UPDATE-GUIDE.md](AUTO-UPDATE-GUIDE.md) for complete details

---

## 🛠️ Tech Stack

- **Electron** 39.1.1 - Desktop app framework
- **React** 18.3.1 - UI framework
- **TypeScript** 5.5.3 - Type safety
- **Vite** 7.2.2 - Build tool
- **WebRTC** - Peer-to-peer streaming
- **Socket.IO** 4.8.1 - Signaling server
- **electron-updater** - Auto-update system
- **robotjs** - Native input control
- **Tailwind CSS** - Styling

---

## 📦 Project Structure

```
DeskLab/
├── electron/                    # Electron main process
│   ├── main.ts                 # Main process + auto-updater
│   └── preload.ts              # IPC bridge
├── src/
│   ├── components/
│   │   ├── UpdateNotification.tsx  # Auto-update UI
│   │   ├── Host.tsx            # Screen sharing host
│   │   ├── Viewer.tsx          # Remote viewer
│   │   └── ...
│   └── App.tsx
├── server/
│   └── server.cjs              # Socket.IO signaling server
├── release/                     # Built apps
└── docs/                        # Documentation
```

---

## 🎯 Current Status

### **Completed:**
- ✅ Screen sharing (full & window)
- ✅ Multi-monitor support
- ✅ Remote control infrastructure
- ✅ Desktop app packaging
- ✅ Auto-update system
- ✅ GitHub Releases integration
- ✅ Environment configuration

### **Testing Needed:**
- ⏳ Remote control (code complete, needs hardware test)
- ⏳ Cross-network testing

### **Planned:**
- 🔜 System audio capture
- 🔜 Code signing certificate
- 🔜 Connection quality indicators

**See:** [PROJECT-STATUS.md](PROJECT-STATUS.md) for complete status

---

## 🧪 Development

### **Run Development Server:**
```powershell
npm run dev:electron
```

This starts:
- Vite dev server (http://localhost:5173)
- Socket.IO signaling server (port 3001)
- Electron window

### **Build Commands:**
```powershell
npm run build:win      # Windows .exe installer
npm run build:mac      # macOS .dmg
npm run build:linux    # Linux AppImage
```

### **Scripts:**
```json
{
  "dev:electron": "Start development environment",
  "build": "Build React app + Electron",
  "build:win": "Build Windows installer",
  "server": "Run signaling server only"
}
```

---

## 🌐 Website Deployment

DeskLab has a professional landing page for easy distribution!

### **Live Website:**
🔗 **Coming Soon:** https://desklab.vercel.app (after deployment)

### **Features:**
- 📥 **Direct Download** - One-click installer download
- 📖 **Documentation** - All guides accessible
- 📱 **Responsive** - Works on all devices
- 🎨 **Professional** - Modern design with animations
- 🔗 **GitHub Integration** - Auto-fetches latest releases

### **Deploy to Vercel:**

#### **Option 1: Vercel CLI (Recommended)**
```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

#### **Option 2: Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import GitHub repository: `PawanLambole/DeskLab`
4. Configure:
   - **Root Directory:** `website`
   - **Framework:** Other
   - Leave build commands empty
5. Click "Deploy"

### **Website Structure:**
```
website/
├── index.html      # Landing page
├── styles.css      # Modern styling
├── script.js       # Interactivity
└── README.md       # Website docs
```

### **Local Testing:**
```powershell
# Using Python
cd website
python -m http.server 8000

# Using Node.js
npx serve website

# Visit http://localhost:8000
```

**See:** [website/README.md](website/README.md) for complete website documentation

---

## 🔐 Security

- ✅ **Context Isolation** enabled
- ✅ **Node Integration** disabled
- ✅ **Secure IPC** communication
- ✅ **Update Verification** (SHA512 hash)
- ✅ **Environment Variables** for sensitive data
- 🔜 **Code Signing** (planned for production)

---

## 📖 How Auto-Update Works

```
App Startup
    ↓
Check GitHub Releases (after 3 seconds)
    ↓
Compare versions (installed vs latest)
    ↓
If newer → Show notification
    ↓
User clicks "Update Now"
    ↓
Download .exe from GitHub
    ↓
Verify SHA512 hash
    ↓
User clicks "Restart Now"
    ↓
App quits → Installer runs → App restarts
    ↓
Success!
```

**Read more:** [AUTO-UPDATE-VISUAL.txt](AUTO-UPDATE-VISUAL.txt)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📝 License

This project is private. Contact the author for usage permissions.

---

## 👤 Author

**DeskLab Team**
- GitHub: [@PawanLambole](https://github.com/PawanLambole)
- Repository: [DeskLab](https://github.com/PawanLambole/DeskLab)

---

## 🙏 Acknowledgments

- **Electron** - Desktop app framework
- **electron-updater** - Auto-update system
- **WebRTC** - P2P streaming technology
- **Socket.IO** - Real-time communication

---

## 📞 Support

**Documentation:** [DOCUMENTATION-INDEX.md](DOCUMENTATION-INDEX.md)

**Issues:** [GitHub Issues](https://github.com/PawanLambole/DeskLab/issues)

**Updates:** [GitHub Releases](https://github.com/PawanLambole/DeskLab/releases)

---

## 🎉 Getting Started

**New to DeskLab?**
1. Read [README-AUTO-UPDATE.md](README-AUTO-UPDATE.md) - Learn about auto-updates
2. Follow [AUTO-UPDATE-QUICK-START.md](AUTO-UPDATE-QUICK-START.md) - Test the system
3. Check [PROJECT-STATUS.md](PROJECT-STATUS.md) - See what's ready

**Ready to Deploy?**
1. Read [AUTO-UPDATE-GUIDE.md](AUTO-UPDATE-GUIDE.md) - Complete deployment guide
2. Follow [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) - Distribution options
3. Create your first release!

---

**Built with ❤️ using Electron, React, and TypeScript**

---

*Last Updated: November 10, 2025*  
*Version: 1.0.0 with Auto-Update Support*
