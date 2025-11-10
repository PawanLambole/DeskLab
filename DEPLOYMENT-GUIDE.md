# 🚀 DeskLab - Deployment & Testing Guide

## Option 1: 📦 Portable Executable (EASIEST - Recommended for Testing)

### What You Have Now:
✅ **Location:** `release/win-unpacked/`  
✅ **Main File:** `DeskLab.exe` (standalone executable)  
✅ **Size:** ~160 MB total folder

### How to Share for Testing:

1. **Zip the entire folder:**
   ```powershell
   Compress-Archive -Path "release\win-unpacked" -DestinationPath "DeskLab-Portable.zip"
   ```

2. **Share via:**
   - 📧 **Email** (if < 25 MB, split with 7-Zip)
   - ☁️ **Google Drive / OneDrive / Dropbox**
   - 🌐 **WeTransfer** (up to 2 GB free)
   - 💾 **USB Drive** (fastest for local network)

3. **Instructions for Tester:**
   ```
   1. Extract the ZIP file
   2. Double-click "DeskLab.exe"
   3. No installation needed!
   ```

---

## Option 2: 🌐 Network Share (Same LAN Only)

### Setup on Your PC:

1. **Share the unpacked folder:**
   - Right-click `release/win-unpacked/` → Properties → Sharing
   - Click "Share" → Add "Everyone" → Read permission
   - Note the network path (e.g., `\\YOUR-PC-NAME\win-unpacked`)

2. **Tell testers:**
   ```
   1. Open File Explorer
   2. Go to: \\YOUR-PC-NAME\win-unpacked
   3. Double-click DeskLab.exe
   ```

### ⚠️ Requirements:
- Same WiFi/LAN network
- Your PC must be ON while they test
- Windows Firewall may block (allow access when prompted)

---

## Option 3: 🖥️ Remote Testing Over Internet

### Current Setup (What Works Now):
✅ WebRTC peer-to-peer connections  
✅ Socket.IO signaling server on port 3001  
❌ Server is localhost only (needs configuration)

### To Enable Internet Access:

#### Step A: Update Server to Listen on All IPs

Edit `server/server.cjs`:
```javascript
// Change from:
const PORT = process.env.PORT || 3001;

// To:
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // Listen on all network interfaces

app.listen(PORT, HOST, () => {
  // ... rest of code
});
```

#### Step B: Get Your Public IP

**Option 1 - Port Forwarding (Best for testing):**
1. Find your public IP: https://whatismyipaddress.com/
2. Forward port 3001 in your router to your PC's local IP
3. Update `.env`:
   ```env
   VITE_SOCKET_URL=http://YOUR-PUBLIC-IP:3001
   ```

**Option 2 - ngrok (Zero configuration):**
```powershell
# Install ngrok
choco install ngrok

# Run your server
npm run server

# In another terminal:
ngrok http 3001

# Copy the forwarding URL (e.g., https://abc123.ngrok.io)
# Update .env:
VITE_SOCKET_URL=https://abc123.ngrok.io
```

**Option 3 - Deploy server to cloud:**
- Deploy `server/server.cjs` to **Heroku/Railway/Render** (free tier)
- Update `.env` with deployed URL

#### Step C: Rebuild with new URL

```powershell
npm run build:win
```

Then share the new `release/win-unpacked/` folder.

---

## Option 4: 📱 Quick Test with ngrok (No Rebuild Needed)

### For Development Testing:

1. **Start everything:**
   ```powershell
   npm run dev:electron
   ```

2. **In new terminal, expose signaling server:**
   ```powershell
   ngrok http 3001
   ```

3. **Copy ngrok URL** (e.g., `https://abc123.ngrok.io`)

4. **Share with tester:**
   - Build a web version: `npm run build`
   - Host `dist/` folder on any web server
   - They access via browser with your ngrok URL

---

## 🎯 Recommended Approach for Your Case:

### For Quick Testing (Today):

```powershell
# 1. Zip the portable app
Compress-Archive -Path "release\win-unpacked" -DestinationPath "DeskLab-Portable.zip"

# 2. Upload to Google Drive/Dropbox
# 3. Share link with tester
# 4. They download, extract, run DeskLab.exe
```

### Important Notes:
- ⚠️ Both HOST and VIEWER need to run the app
- ⚠️ They need to be on same network OR you need public server
- ⚠️ For internet testing, use ngrok for signaling server

---

## 🔧 Build Commands Reference

```powershell
# Build portable (what we just did)
npm run build:win

# Build installer (needs admin rights)
# Run PowerShell as Administrator first
npm run build:win

# Build for other platforms
npm run build:mac    # macOS .dmg
npm run build:linux  # Linux AppImage

# Just the web version (no Electron)
npm run build
```

---

## 📊 What Testers Can Test:

✅ **Screen Sharing:** Share entire screen or specific windows  
✅ **Multi-monitor:** Select which screen to share  
✅ **WebRTC Connection:** Peer-to-peer video streaming  
✅ **Room System:** Create/join with 6-digit room codes  
⏳ **Remote Control:** Infrastructure ready, needs robotjs setup  
❌ **System Audio:** Not implemented yet  

---

## 🐛 Troubleshooting

**"DeskLab.exe not opening":**
- Windows SmartScreen may block → Click "More Info" → "Run Anyway"
- Antivirus might quarantine → Add exception

**"Cannot connect to signaling server":**
- Check if server is running on host
- Verify firewall allows port 3001
- For internet testing, ensure ngrok/public IP is correct

**"Connection works but can't see screen":**
- Both users must be using the app
- Host must click "Start Sharing"
- Viewer must enter correct room code

---

## 📁 Folder Structure After Build

```
DeskLab/
├── release/
│   └── win-unpacked/          ← Share this entire folder
│       ├── DeskLab.exe        ← Main executable
│       ├── resources/         ← App files
│       └── ... (all DLLs)
```

---

## 🚀 Next Steps

1. **Immediate:** Zip and share `win-unpacked` folder
2. **For Internet Testing:** Set up ngrok or port forwarding
3. **For Production:** Create proper installer (needs code signing)

---

## 💡 Pro Tips

- **Portable vs Installer:** Portable is easier for testing, installer is better for distribution
- **File Size:** The app is ~160 MB because it includes full Chromium engine
- **Updates:** To update, just replace the folder with new build
- **Customization:** Change app icon in `build/` folder before building
