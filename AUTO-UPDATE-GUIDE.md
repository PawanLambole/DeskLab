# 🔄 DeskLab Auto-Update Guide

## 📋 Overview

Your DeskLab app now supports **automatic updates** using `electron-updater`. Users install once, and the app automatically checks for new versions and prompts them to update.

---

## ✅ What's Been Added

### 1. **Auto-Update Files Created:**
- ✅ `src/components/UpdateNotification.tsx` - Update UI notification component
- ✅ Updated `electron/main.ts` - Auto-updater logic in main process
- ✅ Updated `electron/preload.ts` - IPC bridge for updates
- ✅ Updated `src/electron.d.ts` - TypeScript definitions
- ✅ Updated `src/App.tsx` - Added UpdateNotification component
- ✅ Updated `package.json` - GitHub Releases configuration

### 2. **Features Implemented:**
✅ **Automatic update checks** on app startup (production only)  
✅ **Manual update checks** from UI  
✅ **Progress notifications** during download  
✅ **One-click install** and restart  
✅ **GitHub Releases integration**  
✅ **Elegant UI notifications** with download progress  

---

## 🚀 How Auto-Update Works

### **User Experience:**

1. **App Starts** → Automatically checks for updates after 3 seconds
2. **Update Found** → Notification appears: "Update available: v1.0.1"
3. **User Clicks "Update Now"** → Download starts with progress bar
4. **Download Complete** → "Restart Now" button appears
5. **User Clicks "Restart Now"** → App closes, installs update, restarts

### **Behind the Scenes:**

```
App Startup
    ↓
Check GitHub Releases
    ↓
Compare versions (1.0.0 vs 1.0.1)
    ↓
If newer → Show notification
    ↓
User clicks "Update Now"
    ↓
Download .exe from GitHub
    ↓
Verify signature
    ↓
Show "Restart Now"
    ↓
User clicks → App quits and installs
    ↓
App restarts with new version
```

---

## 📦 How to Release Updates

### **Method 1: GitHub Releases (Recommended)**

#### **Step 1: Build the App**

```powershell
# Increment version in package.json first
# Example: "version": "1.0.0" → "1.0.1"

# Build Windows installer
npm run build:win
```

This creates:
- `release/DeskLab Setup 1.0.1.exe` (installer)
- `release/latest.yml` (update manifest)

#### **Step 2: Create GitHub Release**

1. Go to: https://github.com/PawanLambole/DeskLab/releases
2. Click **"Draft a new release"**
3. Fill in:
   - **Tag:** `v1.0.1` (must match package.json version with 'v' prefix)
   - **Title:** `DeskLab v1.0.1`
   - **Description:**
     ```
     ## What's New
     - Fixed remote control issues
     - Improved connection stability
     - Bug fixes and performance improvements
     ```
4. **Upload files:**
   - Drag `DeskLab Setup 1.0.1.exe`
   - Drag `latest.yml`
5. Click **"Publish release"**

#### **Step 3: Test the Update**

1. Install **v1.0.0** on test PC
2. Open the app
3. Wait 3-5 seconds
4. Notification should appear: "Update available: v1.0.1"
5. Click "Update Now"
6. Wait for download
7. Click "Restart Now"
8. App should restart with v1.0.1

---

### **Method 2: Custom Update Server (Alternative)**

If you don't want to use GitHub Releases, you can host updates on your own server.

#### **Setup Custom Server:**

1. **Create `update-server/latest.yml`:**
   ```yaml
   version: 1.0.1
   files:
     - url: https://yourserver.com/DeskLab-Setup-1.0.1.exe
       sha512: HASH_HERE
       size: 123456789
   path: DeskLab-Setup-1.0.1.exe
   sha512: HASH_HERE
   releaseDate: '2025-11-10T12:00:00.000Z'
   ```

2. **Update `package.json`:**
   ```json
   "publish": [
     {
       "provider": "generic",
       "url": "https://yourserver.com/updates"
     }
   ]
   ```

3. **Host files:**
   ```
   https://yourserver.com/updates/
   ├── latest.yml
   └── DeskLab-Setup-1.0.1.exe
   ```

---

## 🧪 Testing Auto-Updates

### **Test Setup (2 PCs Required):**

#### **PC 1 - Developer Machine:**

1. **Build v1.0.0:**
   ```powershell
   # In package.json: "version": "1.0.0"
   npm run build:win
   ```

2. **Create GitHub Release v1.0.0:**
   - Upload `DeskLab Setup 1.0.0.exe`
   - Upload `latest.yml`
   - Publish release

3. **Install on Test PC**

#### **PC 2 - Test Machine:**

1. Download and install `DeskLab Setup 1.0.0.exe`
2. Run the app
3. **Don't close it yet!**

#### **Back to PC 1 - Create Update:**

1. **Change version:**
   ```json
   // package.json
   "version": "1.0.1"
   ```

2. **Update something visible** (to confirm update worked):
   ```tsx
   // src/components/Home.tsx
   <h1>DeskLab v1.0.1 - Updated!</h1>
   ```

3. **Build new version:**
   ```powershell
   npm run build:win
   ```

4. **Create GitHub Release v1.0.1:**
   - Upload `DeskLab Setup 1.0.1.exe`
   - Upload `latest.yml`
   - Publish release

#### **Back to PC 2 - Test Update:**

1. Restart DeskLab app (close and reopen)
2. Wait 3-5 seconds
3. Notification appears: "Update available: v1.0.1"
4. Click "Update Now"
5. Progress bar shows download
6. Click "Restart Now"
7. App restarts
8. **Verify:** Should see "DeskLab v1.0.1 - Updated!"

---

## 🔧 Configuration Options

### **Auto-Update Settings in `electron/main.ts`:**

```typescript
// Auto-download updates (true = download automatically)
autoUpdater.autoDownload = false; // We show UI first

// Auto-install on quit (true = install when user closes app)
autoUpdater.autoInstallOnAppQuit = true;

// Check interval (optional - add this if you want periodic checks)
setInterval(() => {
  autoUpdater.checkForUpdates();
}, 3600000); // Check every hour
```

### **Update Check Timing:**

```typescript
// Check 3 seconds after app starts
setTimeout(() => {
  autoUpdater.checkForUpdates();
}, 3000);
```

Change `3000` to delay longer (milliseconds).

---

## 📁 Update Notification UI

### **Notification States:**

1. **Checking for updates...** (spinning icon)
2. **Update available: v1.0.1** (green "Update Now" button)
3. **Downloading update: 45%** (progress bar)
4. **Update ready to install!** (green "Restart Now" button)
5. **You have the latest version** (auto-hides after 5 seconds)
6. **Error checking for updates** (retry button)

### **User Actions:**

- **Update Now** → Downloads the update
- **Restart Now** → Installs update and restarts app
- **X (Close)** → Hides notification (update can be installed later)
- **Retry** → Checks for updates again (after error)

---

## 🛡️ Security & Code Signing

### **⚠️ Important for Production:**

Auto-updates require **code signing** for security. Without it:
- Windows SmartScreen will block updates
- Users get scary warnings

### **How to Add Code Signing:**

1. **Get a Code Signing Certificate:**
   - From: Sectigo, DigiCert, or Comodo
   - Cost: ~$100-$300/year
   - Or: Use free developer certificate (testing only)

2. **Update `package.json`:**
   ```json
   "win": {
     "certificateFile": "path/to/certificate.pfx",
     "certificatePassword": "YOUR_PASSWORD",
     "signingHashAlgorithms": ["sha256"],
     "target": ["nsis"]
   }
   ```

3. **Or use environment variables:**
   ```powershell
   $env:CSC_LINK="C:\path\to\certificate.pfx"
   $env:CSC_KEY_PASSWORD="your_password"
   npm run build:win
   ```

---

## 🔍 Troubleshooting

### **Issue: "Updates not detected"**

**Solution:**
1. Check GitHub release is published (not draft)
2. Verify version in `package.json` matches release tag
3. Check network connection
4. Look at console logs (F12 in dev mode)

### **Issue: "Download fails"**

**Solution:**
1. Verify `.exe` file is uploaded to GitHub release
2. Check `latest.yml` is present
3. Ensure release is public (not private repo)

### **Issue: "Update installs but app doesn't restart"**

**Solution:**
1. Check `autoUpdater.quitAndInstall()` is called
2. Verify user has admin rights (for system-wide install)
3. Check Windows Defender isn't blocking

### **Issue: "Testing updates locally"**

**Testing without GitHub:**
```typescript
// In electron/main.ts (for testing only!)
if (isDev) {
  autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml');
}
```

Create `dev-app-update.yml`:
```yaml
owner: PawanLambole
repo: DeskLab
provider: github
```

---

## 📊 Version Numbering

### **Semantic Versioning:**

```
v1.2.3
│ │ │
│ │ └─ Patch (bug fixes)
│ └─── Minor (new features, backwards compatible)
└───── Major (breaking changes)
```

### **Examples:**

- `1.0.0` → `1.0.1` = Bug fix
- `1.0.1` → `1.1.0` = New feature
- `1.1.0` → `2.0.0` = Major rewrite

**Always increment before building!**

---

## 🎯 Release Checklist

Before publishing a new version:

- [ ] Update `version` in `package.json`
- [ ] Test new features thoroughly
- [ ] Write release notes
- [ ] Build the app: `npm run build:win`
- [ ] Create GitHub release with tag `v1.0.X`
- [ ] Upload `DeskLab Setup 1.0.X.exe`
- [ ] Upload `latest.yml`
- [ ] Publish release
- [ ] Test update on clean install
- [ ] Verify version number after update

---

## 📝 Update Manifest (latest.yml)

**Auto-generated by electron-builder:**

```yaml
version: 1.0.1
files:
  - url: DeskLab Setup 1.0.1.exe
    sha512: ABC123... (hash)
    size: 136070000
path: DeskLab Setup 1.0.1.exe
sha512: ABC123...
releaseDate: '2025-11-10T10:30:00.000Z'
```

**electron-updater reads this to:**
1. Check if new version exists
2. Download the `.exe` file
3. Verify integrity with SHA512 hash
4. Install the update

---

## 💡 Best Practices

### **1. Test Before Release:**
Always test updates on a clean machine before publishing.

### **2. Gradual Rollouts:**
For large user bases, use staged rollouts:
```typescript
// Release to 10% of users first
if (Math.random() < 0.1) {
  autoUpdater.checkForUpdates();
}
```

### **3. Backup User Data:**
Before major updates, prompt users to backup:
```typescript
if (majorVersionChange) {
  dialog.showMessageBox({
    message: 'Recommend backing up your data before updating'
  });
}
```

### **4. Update Notifications:**
Don't interrupt users - show unobtrusive notifications:
- ✅ Small corner notification (current implementation)
- ❌ Full-screen modal blocking work

### **5. Release Notes:**
Always include clear release notes:
```markdown
## v1.0.1 - Bug Fix Release

### Fixed
- Remote control mouse movement accuracy
- Connection stability issues

### Improved
- Update download speed
- Error messages
```

---

## 🌐 Alternative: Manual Update Check

Add a button to manually check for updates:

```tsx
// In src/components/Navbar.tsx or Settings
<button onClick={checkForUpdates}>
  Check for Updates
</button>

const checkForUpdates = async () => {
  await window.electronAPI?.checkForUpdates();
};
```

---

## 📦 Files Generated

After running `npm run build:win`, you get:

```
release/
├── DeskLab Setup 1.0.0.exe     ← Installer (share this)
├── latest.yml                  ← Update manifest (upload to GitHub)
├── win-unpacked/               ← Portable version
└── builder-effective-config.yaml
```

**For GitHub Release, upload:**
- `DeskLab Setup 1.0.X.exe`
- `latest.yml`

---

## ✅ Summary

**What You Have Now:**
- ✅ Automatic update checking
- ✅ User-friendly update notifications
- ✅ Progress indicators during download
- ✅ One-click installation
- ✅ GitHub Releases integration
- ✅ Production-ready auto-updater

**To Release an Update:**
1. Change version in `package.json`
2. Build: `npm run build:win`
3. Create GitHub Release
4. Upload `.exe` and `latest.yml`
5. Publish!

**Users Experience:**
1. App notifies of update
2. One click to download
3. One click to install
4. Seamless restart

---

**Questions? Issues?** Check the troubleshooting section or open an issue on GitHub!

🚀 **Your app is now update-ready!**
