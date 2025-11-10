# 🚀 Complete Deployment Guide

**Deploy DeskLab to GitHub and Vercel in 10 minutes**

This guide covers the complete deployment process: pushing code to GitHub and hosting the website on Vercel.

---

## 📋 Prerequisites

Before starting, ensure you have:

- ✅ Git installed on your system
- ✅ GitHub account created
- ✅ Vercel account (free) - sign up at [vercel.com](https://vercel.com)
- ✅ Built .exe file ready (`release/DeskLab Setup 1.0.0.exe`)
- ✅ Terminal/PowerShell open in project directory

---

## Part 1: Deploy to GitHub

### Step 1: Initialize Git Repository

If not already initialized:

```powershell
# Initialize git
git init

# Check status
git status
```

### Step 2: Create .gitignore

Create or verify `.gitignore` file:

```gitignore
# Dependencies
node_modules/

# Build outputs
dist/
dist-electron/
release/

# Environment
.env
.env.local

# IDE
.vscode/
.idea/

# System
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Temporary
*.tmp
*.temp
```

### Step 3: Add All Files

```powershell
# Add all files
git add .

# Verify what will be committed
git status
```

### Step 4: Create Initial Commit

```powershell
git commit -m "Initial commit - DeskLab v1.0.0 with auto-updates and website"
```

### Step 5: Create GitHub Repository

**Option A: Via GitHub Website**
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `DeskLab`
3. Description: `Remote Desktop Screen Sharing with Auto-Updates`
4. Visibility: **Public** (required for GitHub Releases)
5. **DO NOT** initialize with README
6. Click "Create repository"

**Option B: Via GitHub CLI**
```powershell
gh repo create DeskLab --public --source=. --remote=origin
```

### Step 6: Connect Local to GitHub

```powershell
# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/DeskLab.git

# Verify remote
git remote -v
```

### Step 7: Push to GitHub

```powershell
# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 8: Verify Upload

Visit: `https://github.com/YOUR_USERNAME/DeskLab`

You should see all your files!

---

## Part 2: Create GitHub Release

### Step 1: Prepare Release Files

Locate these files in `release/` folder:
- `DeskLab Setup 1.0.0.exe` (installer)
- `latest.yml` (update manifest)

### Step 2: Create Release on GitHub

1. Go to your repo: `https://github.com/YOUR_USERNAME/DeskLab`
2. Click **"Releases"** (right sidebar)
3. Click **"Create a new release"**

### Step 3: Configure Release

**Tag version:**
- Click "Choose a tag"
- Type: `v1.0.0`
- Click "Create new tag: v1.0.0 on publish"

**Release title:** `DeskLab v1.0.0`

**Description:**
```markdown
# DeskLab v1.0.0 - Initial Release

## ✨ Features
- 🖥️ Screen sharing with multi-monitor support
- 🖱️ Remote control (mouse, keyboard, scroll)
- 🌐 P2P WebRTC connections
- 🔄 Automatic updates via GitHub Releases
- 🔒 Secure and private
- 📱 Simple 6-digit room codes

## 📥 Installation
1. Download `DeskLab Setup 1.0.0.exe`
2. Run the installer
3. Launch DeskLab
4. Start sharing!

## 🔄 Auto-Updates
This version includes automatic update checking. Future updates will be delivered seamlessly!

## 📚 Documentation
- [User Guide](https://github.com/YOUR_USERNAME/DeskLab#readme)
- [Auto-Update Guide](https://github.com/YOUR_USERNAME/DeskLab/blob/main/AUTO-UPDATE-GUIDE.md)

## 🐛 Known Issues
None

## 🙏 Thank You
Thank you for using DeskLab! Please report any issues on GitHub.
```

### Step 4: Upload Files

1. Drag and drop files into "Attach binaries" area:
   - `DeskLab Setup 1.0.0.exe`
   - `latest.yml`

2. Wait for upload to complete

### Step 5: Publish Release

1. ✅ Check "Set as the latest release"
2. Click **"Publish release"**

### Step 6: Verify Release

Your release is live at:
```
https://github.com/YOUR_USERNAME/DeskLab/releases/tag/v1.0.0
```

Download link:
```
https://github.com/YOUR_USERNAME/DeskLab/releases/latest/download/DeskLab-Setup-1.0.0.exe
```

---

## Part 3: Deploy Website to Vercel

### Step 1: Update Website Links

Before deploying, update GitHub username in `website/index.html`:

Find and replace `PawanLambole` with your GitHub username in:
- Download button href
- GitHub links
- Documentation links

```html
<!-- Find this -->
<a href="https://github.com/PawanLambole/DeskLab/releases/latest/download/DeskLab-Setup-1.0.0.exe">

<!-- Replace with -->
<a href="https://github.com/YOUR_USERNAME/DeskLab/releases/latest/download/DeskLab-Setup-1.0.0.exe">
```

Commit changes:
```powershell
git add website/index.html
git commit -m "Update GitHub username in website"
git push
```

### Step 2: Install Vercel CLI

```powershell
npm install -g vercel
```

### Step 3: Login to Vercel

```powershell
vercel login
```

Follow the email verification link.

### Step 4: Deploy Website

```powershell
# Navigate to project root
cd d:\DeskLab\DeskLab

# Deploy
vercel
```

**Answer the prompts:**
```
? Set up and deploy "d:\DeskLab\DeskLab"? [Y/n] Y
? Which scope do you want to deploy to? [Select your account]
? Link to existing project? [y/N] N
? What's your project's name? desklab
? In which directory is your code located? ./website
```

### Step 5: Production Deployment

```powershell
vercel --prod
```

**Your website is live!**
```
✅ Production: https://desklab.vercel.app
```

### Step 6: Configure Custom Domain (Optional)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: **desklab**
3. Go to **Settings** → **Domains**
4. Add custom domain (if you have one)
5. Follow DNS configuration steps

### Step 7: Update Website Repository Link

Update website URL in `README.md`:

```markdown
### **Live Website:**
🔗 https://desklab.vercel.app
```

Commit and push:
```powershell
git add README.md
git commit -m "Add live website URL"
git push
```

---

## Part 4: Verification Checklist

### GitHub Verification ✅

- [ ] Repository is public
- [ ] All files are pushed
- [ ] Release v1.0.0 is created
- [ ] `DeskLab Setup 1.0.0.exe` is uploaded
- [ ] `latest.yml` is uploaded
- [ ] Download link works:
      `https://github.com/YOUR_USERNAME/DeskLab/releases/latest/download/DeskLab-Setup-1.0.0.exe`

### Vercel Verification ✅

- [ ] Website is deployed
- [ ] URL is accessible: `https://desklab.vercel.app`
- [ ] Download button works
- [ ] GitHub links are correct
- [ ] Mobile version works
- [ ] All sections render correctly

### Auto-Update Verification ✅

- [ ] `package.json` has correct GitHub repo
- [ ] `latest.yml` is in release
- [ ] App checks for updates on startup
- [ ] Download link in app works

---

## Part 5: Update Workflow (Future Releases)

When you want to release version 1.0.1:

### 1. Update Version
```powershell
# Update version in package.json
# "1.0.0" → "1.0.1"
```

### 2. Build New Version
```powershell
npm run build:win
```

### 3. Commit Changes
```powershell
git add .
git commit -m "Release v1.0.1"
git push
```

### 4. Create GitHub Release
1. Go to Releases → "Draft a new release"
2. Tag: `v1.0.1`
3. Upload new files:
   - `DeskLab Setup 1.0.1.exe`
   - `latest.yml`
4. Publish

### 5. Update Website
```powershell
# Website auto-updates via GitHub API!
# No manual changes needed
```

### 6. Users Get Auto-Update
- App detects new version
- Users click "Update Now"
- Download and install
- Done!

---

## 🔧 Troubleshooting

### Git Issues

**Problem:** "fatal: remote origin already exists"
```powershell
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/YOUR_USERNAME/DeskLab.git
```

**Problem:** "Updates were rejected"
```powershell
# Pull first, then push
git pull origin main --rebase
git push -u origin main
```

### GitHub Release Issues

**Problem:** Download link 404
- Verify file is uploaded to release
- Check filename matches exactly
- Ensure release is published (not draft)

**Problem:** `latest.yml` not found
- Build app with `npm run build:win`
- File is auto-generated in `release/` folder
- Upload it to the same release as .exe

### Vercel Issues

**Problem:** "404 - File not found"
- Check `vercel.json` routes configuration
- Verify files are in `website/` folder
- Redeploy: `vercel --prod`

**Problem:** Styles not loading
- Check browser console for errors
- Verify `styles.css` path in `index.html`
- Clear browser cache

**Problem:** GitHub API rate limit
- Website makes API calls to fetch stars/releases
- Limited to 60/hour for unauthenticated requests
- Will reset automatically

---

## 📱 Testing Your Deployment

### Test GitHub Release
```powershell
# Download using curl/wget
curl -L -O https://github.com/YOUR_USERNAME/DeskLab/releases/latest/download/DeskLab-Setup-1.0.0.exe

# Or visit in browser
start https://github.com/YOUR_USERNAME/DeskLab/releases/latest
```

### Test Website
```powershell
# Open in browser
start https://desklab.vercel.app
```

### Test Auto-Update
1. Install current version (1.0.0)
2. Create new release (1.0.1)
3. Open app → Wait 3 seconds
4. Should see update notification!

---

## 🎉 Success!

Congratulations! You've successfully:

✅ Pushed code to GitHub
✅ Created your first release
✅ Deployed website to Vercel
✅ Set up auto-update pipeline

**Your DeskLab is now live and ready for users!**

### Share Your Project

**GitHub:** `https://github.com/YOUR_USERNAME/DeskLab`
**Website:** `https://desklab.vercel.app`
**Download:** `https://github.com/YOUR_USERNAME/DeskLab/releases/latest`

---

## 📚 Next Steps

1. **Test on different PCs** - Install and verify functionality
2. **Gather feedback** - Share with users
3. **Plan features** - Check [PROJECT-STATUS.md](PROJECT-STATUS.md)
4. **Create v1.0.1** - Test auto-update flow
5. **Get code signing** - For production distribution

---

## 🆘 Need Help?

**Documentation:**
- [README.md](README.md) - Project overview
- [AUTO-UPDATE-GUIDE.md](AUTO-UPDATE-GUIDE.md) - Auto-update details
- [website/README.md](website/README.md) - Website docs

**Resources:**
- [GitHub Releases Docs](https://docs.github.com/en/repositories/releasing-projects-on-github)
- [Vercel Docs](https://vercel.com/docs)
- [electron-updater Docs](https://www.electron.build/auto-update)

**Issues:**
Open an issue on GitHub: `https://github.com/YOUR_USERNAME/DeskLab/issues`

---

**Built with ❤️ by the DeskLab Team**

*Last Updated: November 10, 2025*
