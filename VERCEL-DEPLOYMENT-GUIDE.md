# 🚀 Deploy DeskLab Website to Vercel

**Complete guide to deploy the landing page using Vercel Dashboard**

---

## ✅ Prerequisites Confirmed

- ✅ GitHub repository exists: `https://github.com/PawanLambole/DeskLab`
- ✅ Website files are in the repository (`website/` folder)
- ✅ `vercel.json` configuration is correct
- ✅ All code is pushed to GitHub

---

## 🌐 Deploy Using Vercel Dashboard (Recommended)

### Step 1: Go to Vercel

Visit: **https://vercel.com**

Click **"Login"** or **"Sign Up"** (use your GitHub account)

---

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Find **"PawanLambole/DeskLab"** in the list
4. Click **"Import"**

**If you don't see the repository:**
- Click **"Adjust GitHub App Permissions"**
- Grant Vercel access to the DeskLab repository
- Return and refresh

---

### Step 3: Configure Project (IMPORTANT!)

On the "Configure Project" page, set these values:

#### Framework Preset
```
Other
```
*(Don't select Next.js, Vite, or any framework)*

#### Root Directory
```
website
```
**⚠️ IMPORTANT:** Click the **"Edit"** button next to Root Directory and select **`website`** folder!

This tells Vercel to serve files from the `website/` folder, not the root.

#### Build Settings

**Build Command:**
```
(Leave empty or enter: echo "Static site - no build needed")
```

**Output Directory:**
```
(Leave empty - it will use the root directory set above)
```

**Install Command:**
```
(Leave empty)
```

---

### Step 4: Environment Variables (Optional)

You don't need any environment variables for the website.

Skip this section.

---

### Step 5: Deploy!

1. Click **"Deploy"**
2. Wait 30-60 seconds for deployment
3. You'll see a success screen with your URL!

---

## ✅ Your Website Will Be Live At:

```
https://desklab.vercel.app
```

or

```
https://desklab-[random].vercel.app
```

You can add a custom domain later in settings.

---

## 🔧 If Deployment Fails

### Issue 1: "No index.html found"

**Solution:** Make sure you set **Root Directory** to `website`

1. Go to **Project Settings**
2. Click **"General"** tab
3. Find **"Root Directory"**
4. Click **"Edit"**
5. Select `website` folder
6. Save and redeploy

---

### Issue 2: "Build failed"

**Solution:** Clear the build command

1. Go to **Project Settings**
2. Click **"Build & Development Settings"**
3. Set **Build Command** to empty or `echo "Static site"`
4. Set **Output Directory** to empty
5. Save and redeploy

---

### Issue 3: "404 Not Found"

**Solution:** Check `vercel.json` configuration

The `vercel.json` file should have:
```json
{
  "version": 2,
  "name": "desklab",
  "buildCommand": "echo 'No build needed - static site'",
  "outputDirectory": "website",
  ...
}
```

If it doesn't, update it and push to GitHub, then redeploy.

---

## 📱 After Deployment - Verify

Visit your website and check:

- [ ] Website loads (not 404)
- [ ] All sections visible (Hero, Features, FAQ, etc.)
- [ ] Download button exists
- [ ] Styles are applied (looks professional, not plain HTML)
- [ ] Mobile version works (use DevTools responsive mode)
- [ ] GitHub links work

---

## 🔄 Redeploy

If you need to redeploy:

1. Go to **Vercel Dashboard**
2. Select **"DeskLab"** project
3. Click **"Deployments"** tab
4. Click **"Redeploy"** on the latest deployment

Or push any change to GitHub - Vercel auto-deploys!

---

## 🎨 Custom Domain (Optional)

To use a custom domain like `desklab.com`:

1. Go to **Project Settings**
2. Click **"Domains"** tab
3. Click **"Add"**
4. Enter your domain
5. Follow DNS configuration steps

---

## 📊 Deployment Settings Summary

For quick reference, here are the correct settings:

| Setting | Value |
|---------|-------|
| **Framework** | Other |
| **Root Directory** | `website` ⚠️ |
| **Build Command** | (empty) |
| **Output Directory** | (empty) |
| **Install Command** | (empty) |

**The key is setting Root Directory to `website`!**

---

## 🆘 Still Having Issues?

### Option 1: Use CLI (Alternative)

```powershell
# Make sure you're in the project root
cd D:\DeskLab\DeskLab

# Deploy with explicit settings
vercel --prod --cwd website
```

This tells Vercel to use the `website` folder as the root.

---

### Option 2: Move Website to Root (Not Recommended)

If all else fails, you could move website files to root, but this is **not recommended** because it mixes application and website files.

---

## ✅ Success Checklist

After deployment:

- [ ] Website accessible at Vercel URL
- [ ] All sections render correctly
- [ ] Download button links to GitHub Release
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Fast loading (<2s)

---

## 📞 Vercel Support

If you still have issues:

- **Vercel Docs:** https://vercel.com/docs
- **Community:** https://github.com/vercel/vercel/discussions
- **Discord:** https://vercel.com/discord

---

## 🎉 After Successful Deployment

1. ✅ Note your website URL
2. ✅ Update README.md with live link
3. ✅ Test download button
4. ✅ Create GitHub Release with .exe file
5. ✅ Share your website!

---

**Your repository is ready. Now just follow the steps above to deploy on Vercel Dashboard!**

*Good luck!* 🚀
