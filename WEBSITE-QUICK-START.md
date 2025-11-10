# 🌐 Website Quick Start

**Deploy DeskLab website to Vercel in 5 minutes**

---

## 🎯 What You'll Do

1. Update GitHub username in website files
2. Push to GitHub
3. Deploy to Vercel
4. Done! 🎉

---

## 📝 Prerequisites

- ✅ GitHub repository created
- ✅ Code pushed to GitHub
- ✅ Vercel account (free) at [vercel.com](https://vercel.com)

---

## 🚀 Steps

### 1. Update Website Links

Open `website/index.html` and replace `PawanLambole` with YOUR GitHub username:

**Find (line ~95):**
```html
<a href="https://github.com/PawanLambole/DeskLab/releases/latest/download/DeskLab-Setup-1.0.0.exe" class="btn btn-primary btn-large download-btn">
```

**Replace with:**
```html
<a href="https://github.com/YOUR_USERNAME/DeskLab/releases/latest/download/DeskLab-Setup-1.0.0.exe" class="btn btn-primary btn-large download-btn">
```

**Also update:** (search for all `PawanLambole`)
- GitHub links
- Documentation links
- Footer links

### 2. Commit Changes

```powershell
git add website/index.html
git commit -m "Update website with correct GitHub username"
git push
```

### 3. Deploy to Vercel

```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

**Answer prompts:**
```
? Set up and deploy? Y
? Which scope? [Select your account]
? Link to existing project? N
? Project name? desklab
? In which directory is your code? ./website
```

### 4. Production Deploy

```powershell
vercel --prod
```

**Your website is live!** 🎉

Example: `https://desklab.vercel.app`

---

## ✅ Verification

Visit your website and check:
- [ ] Website loads correctly
- [ ] Download button works
- [ ] GitHub links point to YOUR repo
- [ ] All sections render properly
- [ ] Mobile version works

---

## 🔗 Important URLs

After deployment, you'll have:

**Website:** `https://desklab.vercel.app`
**Download:** `https://github.com/YOUR_USERNAME/DeskLab/releases/latest/download/DeskLab-Setup-1.0.0.exe`
**Repo:** `https://github.com/YOUR_USERNAME/DeskLab`

---

## 🎨 Customize (Optional)

### Change Colors

Edit `website/styles.css`:

```css
:root {
    --primary: #3b82f6;      /* Blue */
    --secondary: #10b981;    /* Green */
    /* Change these! */
}
```

### Add Analytics

Edit `website/index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔧 Troubleshooting

**Problem:** "404 - File not found"
```powershell
# Check vercel.json is in root
# Redeploy
vercel --prod
```

**Problem:** Styles not loading
- Clear browser cache
- Check browser console for errors
- Verify files are in website/ folder

**Problem:** Wrong GitHub links
- Update index.html with your username
- Commit and push
- Redeploy: `vercel --prod`

---

## 🎯 Next Steps

1. ✅ Share your website: `https://desklab.vercel.app`
2. ✅ Create GitHub Release with .exe file
3. ✅ Test download from website
4. ✅ Share with users!

---

## 📚 More Info

**Full Guide:** [DEPLOYMENT-COMPLETE.md](DEPLOYMENT-COMPLETE.md)
**Website Docs:** [website/README.md](website/README.md)
**Checklist:** [DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md)

---

**That's it! Your professional website is live!** 🚀
