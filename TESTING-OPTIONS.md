# 🎯 TESTING OPTIONS - QUICK REFERENCE

## ✅ OPTION 1: Portable App (EASIEST - RECOMMENDED)

**What:** Share ready-to-run app, no installation needed  
**Best for:** Quick testing on same network  
**File:** `DeskLab-Portable.zip` (136 MB)

### Steps:
1. **Upload** `DeskLab-Portable.zip` to:
   - Google Drive / OneDrive / Dropbox
   - WeTransfer (up to 2GB free): https://wetransfer.com
   - USB drive (for local handoff)

2. **Share link** with tester

3. **Tester Instructions:**
   ```
   1. Download and extract ZIP
   2. Double-click DeskLab.exe
   3. Click "Host" or "Viewer"
   ```

### ⚠️ Limitations:
- Both users need the app
- Works only on **same WiFi/LAN** network
- For internet testing → See Option 2

---

## 🌐 OPTION 2: Internet Testing (Via ngrok)

**What:** Let anyone test over internet (different networks)  
**Best for:** Remote testers not on your network  

### Quick Setup:

1. **Install ngrok:**
   ```powershell
   # Download from: https://ngrok.com/download
   # Or use Chocolatey:
   choco install ngrok
   
   # Sign up free at https://ngrok.com/
   # Then authenticate:
   ngrok config add-authtoken YOUR_TOKEN
   ```

2. **Run setup script:**
   ```powershell
   .\setup-internet-testing.ps1
   ```

3. **Get your public URL:**
   - Check ngrok window (e.g., `https://abc123.ngrok.io`)

4. **Update `.env` file:**
   ```env
   VITE_SOCKET_URL=https://abc123.ngrok.io
   ```

5. **Rebuild app:**
   ```powershell
   npm run build:win
   ```

6. **Share new** `DeskLab-Portable.zip`

### ⚠️ Notes:
- ngrok URL changes each time (free tier)
- Paid ngrok gives permanent URL
- Alternative: Deploy server to cloud (Heroku/Railway)

---

## 🖥️ OPTION 3: Network Share (Same Building)

**What:** Share directly from your PC  
**Best for:** LAN testing without file transfers  

### Steps:

1. **Share folder:**
   - Right-click `release\win-unpacked`
   - Properties → Sharing → Share
   - Add "Everyone" with Read permission

2. **Note network path:** `\\YOUR-PC-NAME\win-unpacked`

3. **Tell tester:**
   ```
   1. Open File Explorer
   2. Type in address bar: \\YOUR-PC-NAME\win-unpacked
   3. Double-click DeskLab.exe
   ```

### ⚠️ Requirements:
- Same WiFi/LAN
- Your PC must stay ON
- Windows firewall may need exception

---

## 🏗️ OPTION 4: Web Version (Browser - Limited Features)

**What:** Run viewer in browser (host must use Electron app)  
**Best for:** Quick viewer-only testing  

### Steps:

1. **Build web version:**
   ```powershell
   npm run build
   ```

2. **Host `dist/` folder:**
   ```powershell
   # Using Python:
   cd dist
   python -m http.server 8080
   
   # Or using Node:
   npx serve dist -p 8080
   ```

3. **Expose with ngrok:**
   ```powershell
   ngrok http 8080
   ```

4. **Share ngrok URL** with viewer

### ⚠️ Limitations:
- Viewer-only in browser (no native screen capture)
- Host MUST use Electron app
- No remote control in browser
- Browser permission prompts

---

## 📊 COMPARISON TABLE

| Option | Setup Time | Network Req. | Features | Best Use Case |
|--------|-----------|--------------|----------|---------------|
| **Portable App** | 5 min | Same LAN | Full | Quick local testing |
| **Internet (ngrok)** | 15 min | Any | Full | Remote testers |
| **Network Share** | 2 min | Same LAN | Full | Office/same building |
| **Web Version** | 10 min | Any | Viewer only | Browser testing |

---

## 🎯 MY RECOMMENDATION FOR YOU:

### For Today (Quick Test):
```powershell
# 1. Upload the portable ZIP
Upload "DeskLab-Portable.zip" to Google Drive

# 2. Share link
Send link to tester

# 3. Test on same network first
Both run DeskLab.exe on same WiFi
```

### For Internet Testing (Later):
```powershell
# 1. Install ngrok
choco install ngrok

# 2. Run setup
.\setup-internet-testing.ps1

# 3. Rebuild with ngrok URL
npm run build:win

# 4. Share new build
```

---

## 📁 WHAT YOU HAVE NOW:

```
DeskLab/
├── DeskLab-Portable.zip           ← 📦 READY TO SHARE (136 MB)
├── release/
│   └── win-unpacked/              ← 📂 Extracted version
│       ├── DeskLab.exe            ← Main app
│       └── README.txt             ← Instructions
├── DEPLOYMENT-GUIDE.md            ← 📖 Full guide
├── setup-internet-testing.ps1     ← 🔧 Ngrok helper
└── TESTING-OPTIONS.md             ← 📋 This file
```

---

## 🚀 NEXT STEPS:

### To Test Locally (Same Network):
1. ✅ Upload `DeskLab-Portable.zip` to cloud storage
2. ✅ Share download link
3. ✅ Both extract and run `DeskLab.exe`
4. ✅ Host shares screen → Viewer enters room code

### To Test Over Internet:
1. ⏳ Install ngrok (5 minutes)
2. ⏳ Run `setup-internet-testing.ps1`
3. ⏳ Update `.env` with ngrok URL
4. ⏳ Rebuild: `npm run build:win`
5. ⏳ Share new portable ZIP

---

## 💡 PRO TIPS:

- **File Size Too Big for Email?** 
  - Use WeTransfer (free up to 2GB)
  - Or split with 7-Zip: `7z a -v50m DeskLab.7z release\win-unpacked`

- **Want Permanent URL?**
  - Deploy server to Railway/Render (free tier)
  - Or get ngrok paid plan ($8/month)

- **Security Concern?**
  - Add password protection to rooms (future feature)
  - Use temporary ngrok URLs for testing only
  - For production, use proper server with SSL

---

## 🆘 TROUBLESHOOTING:

**Tester can't run DeskLab.exe:**
→ Tell them to click "More info" → "Run anyway" on SmartScreen warning

**Can't connect to each other:**
→ Check both are using same signaling server URL in .env

**Firewall blocking:**
→ Allow port 3001 in Windows Firewall

**ngrok session expired:**
→ Free tier disconnects after 2 hours, restart ngrok

---

**Ready to share?** Just upload `DeskLab-Portable.zip` and send the link! 🚀
