# ⚠️ IMPORTANT - UPDATED ZIP FILE FOR TESTING

## 🔴 OLD ZIP FILE PROBLEM
**File:** `DeskLab-Portable.zip` (OLD - Don't use!)
**Problem:** Hardcoded to `localhost:3001` - Won't work on different PCs

## ✅ NEW UPDATED ZIP FILE
**File:** `DeskLab-Portable-UPDATED.zip` (USE THIS!)
**Fixed:** Uses `192.168.29.56:3001` - Works on different PCs on same network

---

## 📋 TESTING INSTRUCTIONS

### **Setup (On YOUR PC - The Host):**

1. **Start the signaling server:**
   ```powershell
   cd D:\DeskLab\DeskLab
   npm run server
   ```
   Keep this terminal open!

2. **Share the UPDATED ZIP:**
   - Upload `DeskLab-Portable-UPDATED.zip` to cloud storage
   - Send link to tester

---

### **On HOST PC (Your PC - 192.168.29.56):**

1. Extract `DeskLab-Portable-UPDATED.zip`
2. Double-click `DeskLab.exe`
3. Click **"Host"**
4. Click **"Start Sharing"**
5. **Note the 6-digit room code**
6. Share this code with the viewer

---

### **On VIEWER PC (Other PC - Same WiFi):**

1. Extract `DeskLab-Portable-UPDATED.zip`
2. Double-click `DeskLab.exe`
3. Click **"Viewer"**
4. Enter the 6-digit room code
5. Click **"Connect"**

---

## ✅ WHAT TO TEST:

### **Basic Functionality:**
- [ ] Viewer can see Host's screen in real-time
- [ ] Video quality is good
- [ ] No lag or freezing

### **Remote Control (CRITICAL):**
- [ ] Viewer can move mouse on Host's screen
- [ ] Viewer can click on Host's screen
- [ ] Viewer can type on Host's keyboard
- [ ] Viewer can scroll on Host's screen

### **Expected Results:**
✅ **Screen sharing works** - Should see host screen clearly
✅ **Remote control works** - Should be able to control host PC
❌ **No system audio** - This is expected (not implemented yet)

---

## 🔧 NETWORK REQUIREMENTS:

### **For This Test:**
- Both PCs must be on **SAME WiFi network** (192.168.29.x)
- Host PC (yours) must have IP: **192.168.29.56**
- Firewall must allow port **3001**
- Server must be running on Host PC

### **To Verify Network:**

**On Your PC (Host):**
```powershell
ipconfig
# Should show: 192.168.29.56
```

**On Viewer PC:**
```powershell
ping 192.168.29.56
# Should respond successfully
```

---

## 🚨 TROUBLESHOOTING:

### **Problem: "Cannot connect to signaling server"**

**Solution 1 - Check server is running:**
```powershell
# On your PC:
npm run server
# Should show: Running on http://localhost:3001
```

**Solution 2 - Check firewall:**
```powershell
# On your PC - Allow port 3001:
netsh advfirewall firewall add rule name="DeskLab Server" dir=in action=allow protocol=TCP localport=3001
```

**Solution 3 - Verify IP hasn't changed:**
```powershell
ipconfig
# If IP changed from 192.168.29.56, you need to rebuild!
```

---

### **Problem: "Viewer can't see screen"**

**Check:**
- Host clicked "Start Sharing"?
- Both entered same room code?
- Check browser console for errors (F12)

---

### **Problem: "Remote control not working"**

**Debug:**
1. Open browser console (F12) on both PCs
2. Check for "Data channel opened" message
3. Try moving mouse slowly
4. Check if events are being sent
5. Report any error messages

---

## 📊 IF YOUR IP CHANGES:

Your WiFi IP might change. If `192.168.29.56` is not your current IP:

1. **Find your current IP:**
   ```powershell
   ipconfig | Select-String "IPv4"
   # Look for 192.168.x.x
   ```

2. **Update .env:**
   ```env
   VITE_SOCKET_URL=http://YOUR-NEW-IP:3001
   ```

3. **Rebuild:**
   ```powershell
   npm run build:win
   ```

4. **Recreate ZIP:**
   ```powershell
   Compress-Archive -Path "release\win-unpacked" -DestinationPath "DeskLab-Portable-UPDATED.zip" -Force
   ```

---

## 🎯 QUICK START CHECKLIST:

**Before Testing:**
- [x] Updated ZIP created: `DeskLab-Portable-UPDATED.zip`
- [ ] Server running on your PC: `npm run server`
- [ ] Both PCs on same WiFi (192.168.29.x network)
- [ ] Firewall allows port 3001

**Testing Steps:**
- [ ] Extract ZIP on both PCs
- [ ] Host: Run app → Host mode → Start Sharing
- [ ] Viewer: Run app → Viewer mode → Enter code
- [ ] Test: Can viewer see screen?
- [ ] Test: Can viewer control mouse?
- [ ] Test: Can viewer type on keyboard?

---

## ✅ SUCCESS CRITERIA:

### **Minimum Working Test:**
✅ Viewer connects and sees Host screen  
✅ Viewer can move mouse on Host screen  
✅ Viewer can click on Host screen  
✅ Viewer can type on Host keyboard  

### **If Above Works:**
🎉 **You have basic AnyDesk functionality!**
- Just missing: System audio
- Optional: Better UI, quality indicators

### **If Remote Control Doesn't Work:**
🔧 **Need debugging:**
- Check console errors
- Verify data channels
- Test robotjs separately
- Report findings for fixes

---

## 📁 FILES:

- ❌ `DeskLab-Portable.zip` - OLD, don't use
- ✅ `DeskLab-Portable-UPDATED.zip` - USE THIS (136 MB)

---

**Ready to test? Upload the UPDATED ZIP and try it!** 🚀

Next update depends on test results:
- If works → Add system audio (optional)
- If doesn't work → Debug and fix issues
