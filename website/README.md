# DeskLab Website

Professional landing page for DeskLab - Remote Desktop Screen Sharing Application.

## 📁 Files

- `index.html` - Main landing page with all sections
- `styles.css` - Modern styling with gradients and animations
- `script.js` - Interactive features and GitHub API integration

## 🎨 Features

### Design
- Modern gradient hero section
- Responsive grid layouts
- Smooth animations and transitions
- Mobile-friendly navigation
- Professional card designs

### Interactivity
- Mobile menu toggle
- Smooth scrolling navigation
- Download tracking
- GitHub stars counter
- Latest release detection
- Platform detection
- Loading states
- Copy to clipboard functionality
- Easter egg (Konami code)

### Sections
1. **Hero** - Main CTA with download buttons
2. **Features** - 6 key features in cards
3. **How It Works** - 3-step process
4. **Download** - Windows installer with system requirements
5. **Documentation** - Links to all guides
6. **FAQ** - 6 common questions
7. **CTA** - Final call-to-action
8. **Footer** - Links and social media

## 🚀 Local Testing

1. Open `index.html` in a browser
2. Or use a local server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve
   
   # PHP
   php -S localhost:8000
   ```

3. Visit `http://localhost:8000`

## 🌐 Deployment to Vercel

### Via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? **desklab**
   - In which directory is your code located? **./website**

5. Production deployment:
   ```bash
   vercel --prod
   ```

### Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `website`
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
5. Click "Deploy"

## 📝 Configuration

The `vercel.json` file in the root directory contains:
- Static file serving configuration
- Security headers (X-Content-Type-Options, X-Frame-Options)
- Cache control for assets
- Route configuration

## 🔗 Update Download Links

The website automatically fetches the latest release from GitHub API:
- Stars count: Updates dynamically
- Latest version: Pulled from releases
- Download link: Points to latest .exe file

Manual download link format:
```
https://github.com/PawanLambole/DeskLab/releases/latest/download/DeskLab-Setup-{version}.exe
```

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #3b82f6;
    --primary-dark: #2563eb;
    --secondary: #10b981;
    /* ... */
}
```

### Content
Update text in `index.html`:
- Hero title and description
- Features list
- FAQ questions
- System requirements
- Contact information

### Analytics (Optional)
Add Google Analytics in `index.html`:
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

## 🔍 SEO Optimization

The website includes:
- Meta description and keywords
- Open Graph tags for social sharing
- Twitter Card tags
- Semantic HTML5 structure
- Proper heading hierarchy
- Alt text for images

## 📱 Responsive Design

Breakpoints:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## 🐛 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Android

## 📞 Support

For issues with the website, please open an issue on GitHub:
https://github.com/PawanLambole/DeskLab/issues

## 📄 License

Same as DeskLab project - MIT License
