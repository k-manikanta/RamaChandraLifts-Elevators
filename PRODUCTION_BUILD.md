# Production Build Setup - Tailwind CSS CLI

This guide explains how to build optimized CSS for production using Tailwind CSS CLI.

## 📋 Prerequisites

You need **Node.js** and **npm** installed on your system.

- **Download Node.js**: https://nodejs.org/
- Includes npm automatically
- Requires Node.js v14+

### Verify Installation

```bash
node --version
npm --version
```

---

## 🚀 Setup Instructions

### Step 1: Install Dependencies

Navigate to the project directory and install Tailwind CSS and related tools:

```bash
npm install
```

This installs:
- `tailwindcss` - CSS framework
- `postcss` - CSS processor  
- `autoprefixer` - Browser compatibility

### Step 2: Generate CSS

Build the optimized CSS file:

```bash
npm run build
```

This command:
- Reads `src/input.css` (Tailwind directives)
- Scans all HTML files for used classes
- Generates `css/tailwind.css` (optimized output)
- Only includes styles actually used in your HTML

### Step 3: Open Website

Open `index.html` in your browser. It now uses:
- ✅ Local `css/tailwind.css` (no CDN needed)
- ✅ Optimized file size (~50-70 KB)
- ✅ Fast loading
- ✅ Production-ready

---

## 🔄 Development Workflow

### Watch Mode (Auto-rebuild on file changes)

```bash
npm run dev
```

This:
- Monitors all HTML files for changes
- Automatically rebuilds CSS when you update HTML
- Useful while developing

### Minified Build (For Production)

```bash
npm run minify
```

This:
- Removes all unnecessary whitespace
- Reduces file size
- Fastest loading

---

## 📁 Project Structure

```
RamaChandraLifts-Elevators/
├── index.html               # Home page
├── services.html            # Services page
├── about.html               # About page
├── contact.html             # Contact page
├── css/
│   ├── style.css           # Custom styles (legacy)
│   └── tailwind.css        # Generated CSS (created by build)
├── js/
│   └── script.js           # JavaScript functionality
├── src/
│   └── input.css           # Tailwind directives (source)
├── package.json            # npm configuration
├── tailwind.config.js      # Tailwind configuration
└── postcss.config.js       # PostCSS configuration
```

---

## ⚙️ Configuration Files

### `tailwind.config.js`
Defines:
- Content files to scan (HTML files)
- Custom colors and theme
- Custom animations
- Plugins

Modify this to add new colors or extend Tailwind.

### `postcss.config.js`
Configures PostCSS with:
- Tailwind plugin
- Autoprefixer (browser compatibility)

### `src/input.css`
Tailwind directives:
```css
@tailwind base;        /* Base styles */
@tailwind components;  /* Component styles */
@tailwind utilities;   /* Utility classes */
```

Custom CSS added here becomes part of output.

---

## 📊 CSS Output Comparison

| Aspect | CDN | Built CSS |
|--------|-----|-----------|
| **Source** | Remote server | Local file |
| **Size** | ~35 KB | ~60 KB (full) or ~20 KB (minified) |
| **Includes** | All Tailwind classes | Only used classes |
| **Load Speed** | Depends on internet | Instant (local) |
| **Production Ready** | ❌ No | ✅ Yes |
| **Offline** | ❌ Requires internet | ✅ Works offline |

---

## 🔧 Customization

### Add Custom Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'brand-blue': '#1e40af',
      'brand-gold': '#d4a853',
    }
  }
}
```

Then rebuild: `npm run build`

### Add Custom Animations

Edit `src/input.css`:

```css
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
```

Add to `tailwind.config.js`:

```javascript
animation: {
  'slide-in': 'slideIn 0.3s ease-in',
}
```

### Use New Classes

After rebuild, use in HTML:

```html
<div class="text-brand-gold animate-slide-in">...</div>
```

---

## 🚀 Deployment

### Option 1: Deploy Built CSS

1. Run `npm run minify`
2. Upload entire project to hosting
3. Website uses local `css/tailwind.css`
4. No dependencies needed on server

### Option 2: Netlify with Automatic Builds

1. Push code to GitHub
2. Connect to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.`
5. Deploy automatically

### Option 3: Vercel (Similar to Netlify)

1. Push to GitHub
2. Import project in Vercel
3. Auto-detects `package.json`
4. Builds CSS automatically
5. Deploy

### Option 4: GitHub Pages

1. Build locally: `npm run minify`
2. Commit `css/tailwind.css` to git
3. Push to GitHub
4. Enable Pages
5. Website goes live

---

## 🔐 Security

**All local** - No external dependencies at runtime
- Tailwind CSS loaded locally
- No CDN needed
- Works offline
- Faster, more secure

---

## 🆘 Troubleshooting

### Issue: CSS file not generated
```
Solution: Check Node.js is installed
npm --version
```

### Issue: Changes not reflecting
```
Solution: Stop watch mode and rebuild
npm run build
```

### Issue: File too large
```
Solution: Use minified version
npm run minify
```

### Issue: Styles look different
```
Solution: Clear browser cache
Ctrl+Shift+Delete (Windows)
Cmd+Shift+Delete (Mac)
```

### Issue: npm install fails
```
Solution: Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
npm install
```

---

## 📈 Performance Tips

1. **Use minified CSS**: `npm run minify`
2. **Remove unused CSS**: Tailwind does this automatically
3. **Compress images**: Use WebP format
4. **Enable GZIP**: Your hosting should do this
5. **Use CDN**: For images, not CSS (CSS is local)

---

## 🔄 Update Tailwind

To update Tailwind to latest version:

```bash
npm update tailwindcss
npm run build
```

---

## ✅ Verification Checklist

- [ ] Node.js installed (`node --version` works)
- [ ] Dependencies installed (`npm install` completed)
- [ ] CSS built (`npm run build` creates `css/tailwind.css`)
- [ ] Website opens and looks correct
- [ ] No console errors (F12 → Console)
- [ ] Styles load from local file (not CDN)
- [ ] All pages look right
- [ ] Forms work
- [ ] Responsive design works
- [ ] No internet required to run

---

## 📚 Resources

- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Tailwind CLI Docs**: https://tailwindcss.com/docs/installation/using-postcss
- **Node.js Download**: https://nodejs.org/
- **npm Docs**: https://docs.npmjs.com/

---

## 🎯 Next Steps

1. **Install Node.js** (if not already installed)
2. **Run `npm install`** to setup
3. **Run `npm run build`** to generate CSS
4. **Open `index.html`** and verify it works
5. **Deploy** to your hosting

Your website is now **production-ready** with optimized CSS! 🚀

---

**Last Updated**: April 27, 2026
**Status**: Production Ready
**Build Tool**: Tailwind CLI v3.4.17
