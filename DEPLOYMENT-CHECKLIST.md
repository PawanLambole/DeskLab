# ✅ Deployment Checklist

Quick reference checklist for deploying DeskLab to GitHub and Vercel.

---

## 📝 Pre-Deployment

- [ ] All code is committed and working
- [ ] `.exe` file is built (`npm run build:win`)
- [ ] `latest.yml` is in `release/` folder
- [ ] Version is correct in `package.json`
- [ ] GitHub repository name is correct in `package.json`

---

## 🚀 GitHub Deployment

### Initialize & Push

- [ ] `git init` (if new repo)
- [ ] Create `.gitignore` file
- [ ] `git add .`
- [ ] `git commit -m "Initial commit - DeskLab v1.0.0"`
- [ ] Create GitHub repository (public)
- [ ] `git remote add origin https://github.com/YOUR_USERNAME/DeskLab.git`
- [ ] `git branch -M main`
- [ ] `git push -u origin main`

### Create Release

- [ ] Go to GitHub Releases
- [ ] Click "Create a new release"
- [ ] Tag: `v1.0.0`
- [ ] Title: `DeskLab v1.0.0`
- [ ] Add release description
- [ ] Upload `DeskLab Setup 1.0.0.exe`
- [ ] Upload `latest.yml`
- [ ] Click "Publish release"
- [ ] Test download link

---

## 🌐 Website Deployment

### Prepare Website

- [ ] Update GitHub username in `website/index.html`
- [ ] Replace all `PawanLambole` with your username
- [ ] Update download links to your repo
- [ ] Commit changes: `git commit -am "Update website links"`
- [ ] Push: `git push`

### Deploy to Vercel

- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login: `vercel login`
- [ ] Deploy: `vercel`
- [ ] Answer prompts:
  - Project name: `desklab`
  - Directory: `./website`
- [ ] Production: `vercel --prod`
- [ ] Note your URL: `https://desklab.vercel.app`
- [ ] Update README with website URL
- [ ] Push README update

---

## ✅ Verification

### GitHub

- [ ] Repository is public
- [ ] All files visible on GitHub
- [ ] Release v1.0.0 exists
- [ ] Download link works
- [ ] `latest.yml` is accessible

### Website

- [ ] Website loads: `https://desklab.vercel.app`
- [ ] Download button works
- [ ] All sections render correctly
- [ ] Mobile version works
- [ ] GitHub links point to your repo

### Auto-Update

- [ ] `package.json` has correct repo
- [ ] App checks for updates (wait 3 seconds after opening)
- [ ] Update notification appears (after creating v1.0.1)

---

## 🎯 Quick Commands

```powershell
# Push to GitHub
git add .
git commit -m "Your message"
git push

# Deploy to Vercel
vercel --prod

# Build new version
npm run build:win

# Check git status
git status

# View remotes
git remote -v
```

---

## 📞 URLs to Remember

**Repository:** `https://github.com/YOUR_USERNAME/DeskLab`
**Releases:** `https://github.com/YOUR_USERNAME/DeskLab/releases`
**Website:** `https://desklab.vercel.app`
**Download:** `https://github.com/YOUR_USERNAME/DeskLab/releases/latest/download/DeskLab-Setup-1.0.0.exe`

---

## 🔄 Future Update Process

For version 1.0.1:

1. [ ] Update `package.json` version
2. [ ] `npm run build:win`
3. [ ] `git add .`
4. [ ] `git commit -m "Release v1.0.1"`
5. [ ] `git push`
6. [ ] Create GitHub Release v1.0.1
7. [ ] Upload new `.exe` and `latest.yml`
8. [ ] Users auto-update! 🎉

---

**See:** [DEPLOYMENT-COMPLETE.md](DEPLOYMENT-COMPLETE.md) for detailed instructions
