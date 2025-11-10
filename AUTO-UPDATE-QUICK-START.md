# 🚀 Quick Start - Auto-Update Testing

## Test Auto-Update in 15 Minutes

### **Prerequisites:**
- GitHub account
- 2 Windows PCs (or 1 PC + 1 VM)

---

## 📋 Step-by-Step Testing

### **Phase 1: Build v1.0.0 (5 minutes)**

```powershell
# On your development PC

# 1. Ensure version is 1.0.0
# Check package.json: "version": "1.0.0"

# 2. Build the installer
npm run build:win

# 3. Files created in release/:
#    - DeskLab Setup 1.0.0.exe
#    - latest.yml
```

---

### **Phase 2: Create GitHub Release v1.0.0 (3 minutes)**

1. Go to: https://github.com/PawanLambole/DeskLab/releases
2. Click **"Draft a new release"**
3. Fill in:
   - Tag: `v1.0.0`
   - Title: `DeskLab v1.0.0 - Initial Release`
   - Description: `First release with auto-update support`
4. Upload:
   - `release/DeskLab Setup 1.0.0.exe`
   - `release/latest.yml`
5. Click **"Publish release"**

---

### **Phase 3: Install on Test PC (2 minutes)**

```powershell
# On test PC (or different user account)

# 1. Download DeskLab Setup 1.0.0.exe from GitHub release
# 2. Run installer
# 3. Install to default location
# 4. Launch DeskLab
# 5. Should see "No updates available" after 3 seconds
```

---

### **Phase 4: Create Update v1.0.1 (5 minutes)**

```powershell
# Back on development PC

# 1. Change version in package.json
#    "version": "1.0.0" → "1.0.1"

# 2. Make a visible change (to confirm update worked)
#    Edit src/components/Home.tsx:
```

```tsx
<h1 className="text-4xl font-bold text-gray-900 mb-4">
  DeskLab v1.0.1 🎉 {/* Add version indicator */}
</h1>
```

```powershell
# 3. Build new version
npm run build:win

# 4. Create GitHub release v1.0.1
#    - Tag: v1.0.1
#    - Upload: DeskLab Setup 1.0.1.exe
#    - Upload: latest.yml
#    - Publish

# 5. Wait 1-2 minutes for GitHub to process
```

---

### **Phase 5: Test Auto-Update (3 minutes)**

```powershell
# On test PC

# 1. If DeskLab is still running from Phase 3:
#    - Close it completely
#    - Reopen DeskLab

# 2. Wait 3-5 seconds

# 3. Should see notification:
#    "Update available: v1.0.1"
#    [Update Now] button

# 4. Click "Update Now"

# 5. Watch progress bar:
#    "Downloading update: 25%..."
#    "Downloading update: 50%..."
#    "Downloading update: 100%"

# 6. Notification changes:
#    "Update ready to install!"
#    [Restart Now] button

# 7. Click "Restart Now"

# 8. App closes and reopens

# 9. Verify: Should see "DeskLab v1.0.1 🎉"

# ✅ SUCCESS!
```

---

## 🎯 What You Just Tested

✅ **Automatic update detection** (on app startup)  
✅ **GitHub Releases integration** (version comparison)  
✅ **Download with progress** (visual feedback)  
✅ **Automatic installation** (seamless update)  
✅ **App restart** (no manual steps)  

---

## 🔧 Troubleshooting

### **Issue: No update notification appears**

**Check:**
1. GitHub release is **published** (not draft)
2. Tag is `v1.0.1` (with lowercase 'v')
3. Both `.exe` and `latest.yml` are uploaded
4. Wait full 5 seconds after app opens
5. Check console (F12) for errors

**Force check:**
- Press F12 (Dev Tools)
- Console tab
- Type: `window.electronAPI.checkForUpdates()`

---

### **Issue: Download fails**

**Check:**
1. Internet connection working
2. GitHub release is public
3. `.exe` file uploaded correctly
4. File size matches (not corrupted)

---

### **Issue: Update downloads but doesn't install**

**Check:**
1. User has admin rights
2. Antivirus not blocking
3. Previous app version is closed
4. Windows Defender exclusion added

---

## 💡 Quick Tips

### **Test Without Installing:**

Use portable version for quick testing:
```powershell
# Run from release/win-unpacked/
.\DeskLab.exe

# Note: Auto-update works here too!
```

### **View Update Logs:**

```typescript
// In electron/main.ts - already added
autoUpdater.logger = console;
```

Check logs in:
```
C:\Users\YourName\AppData\Roaming\DeskLab\logs\
```

### **Test with Different Versions:**

```powershell
# Quick version changes:
# 1.0.0 → 1.0.1 (patch)
# 1.0.1 → 1.1.0 (minor)
# 1.1.0 → 2.0.0 (major)

# electron-updater accepts all!
```

---

## 📊 Testing Checklist

Before releasing to real users:

- [ ] Test update from v1.0.0 → v1.0.1
- [ ] Test update from v1.0.1 → v1.1.0
- [ ] Test "no update available" scenario
- [ ] Test with slow internet (check progress bar)
- [ ] Test canceling download (close app mid-download)
- [ ] Test with VPN enabled
- [ ] Test on fresh Windows install
- [ ] Test update persistence (survive crashes)

---

## 🎓 Understanding the Flow

```
User opens DeskLab v1.0.0
         ↓
3 seconds delay
         ↓
Main process checks GitHub Releases API
         ↓
Finds latest.yml for v1.0.1
         ↓
Compares: 1.0.0 < 1.0.1 → Update available!
         ↓
Sends IPC message to renderer
         ↓
UpdateNotification component shows
         ↓
User clicks "Update Now"
         ↓
Renderer sends IPC: downloadUpdate()
         ↓
Main process downloads .exe from GitHub
         ↓
Progress events sent to renderer
         ↓
Download complete → Verify SHA512 hash
         ↓
Show "Restart Now" button
         ↓
User clicks → quitAndInstall()
         ↓
App quits
         ↓
Windows runs installer silently
         ↓
App restarts with v1.0.1
         ↓
Success! 🎉
```

---

## 🚀 Next Steps

### **For Production:**

1. **Get code signing certificate** ($100-300/year)
2. **Test on 5-10 beta users** before public release
3. **Set up automated builds** (GitHub Actions)
4. **Monitor update success rate** (add analytics)
5. **Create rollback plan** (keep old versions)

### **Advanced Features:**

```typescript
// Scheduled update checks (every 6 hours)
setInterval(() => {
  autoUpdater.checkForUpdates();
}, 21600000);

// Update only during idle time
app.on('browser-window-blur', () => {
  autoUpdater.checkForUpdates();
});

// Staged rollouts (10% of users)
if (Math.random() < 0.1) {
  autoUpdater.checkForUpdates();
}
```

---

## 📖 Full Documentation

For complete details, see:
- **AUTO-UPDATE-GUIDE.md** - Full implementation guide
- **DEPLOYMENT-GUIDE.md** - Distribution strategies
- **PROJECT-STATUS.md** - Current feature status

---

**Ready to test?** Follow Phase 1-5 above! 🚀

Total time: **~15 minutes**

---

## ✅ Success Criteria

You'll know it works when:
1. ✅ v1.0.0 installs cleanly
2. ✅ Update notification appears automatically
3. ✅ Progress bar shows during download
4. ✅ App restarts with v1.0.1
5. ✅ Home screen shows "v1.0.1 🎉"

**That's it!** Your auto-update system is working! 🎊
