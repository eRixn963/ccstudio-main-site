# Core Code AI Studio - Blog Site

## 🌐 Domain: blog.corecodes.org

This is the separated blog site for Core Code AI Studio.

## 📁 Structure:
- `index.html` - Blog homepage (formerly blog.html)
- `article.html` - Article detail pages
- `admin.html` - Admin panel for managing blog
- All supporting CSS and JS files

## 🔗 Cross-Site Links:

### From Blog to Main Site:
- Logo → https://corecodes.org
- Features → https://corecodes.org#features
- Solutions → https://corecodes.org#solutions
- Studio → https://corecodes.org#studio
- Pricing → https://corecodes.org#pricing

### From Main Site to Blog:
- "Check out our Blog!" → https://blog.corecodes.org

## 🚀 Deployment:

1. **Deploy this folder to Netlify**
2. **Configure custom domain:**
   - Go to Netlify site settings
   - Domain settings → Add custom domain
   - Enter: `blog.corecodes.org`
   - Add DNS record at your registrar:
     - Type: CNAME
     - Name: blog
     - Value: [your-netlify-subdomain].netlify.app

3. **Main site deployment:**
   - Deploy `main-site` folder to separate Netlify site
   - Configure domain: `corecodes.org`

## ✅ Changes Made:

1. ✅ Renamed `blog.html` to `index.html` (blog homepage)
2. ✅ Updated all internal blog links to use relative paths (/)
3. ✅ Updated all main site links to https://corecodes.org
4. ✅ Updated admin panel links
5. ✅ Updated article navigation
6. ✅ Fixed "Back to Blog" links
7. ✅ Updated mobile menu links

## 📝 Files Included:

- index.html (blog homepage)
- article.html
- admin.html
- styles.css (shared styles)
- blog-styles.css
- blog-script.js
- article-styles.css
- article-script.js
- admin-styles.css
- admin-script.js
- netlify.toml (deployment config)

## 🎯 Features:

- ✅ Search functionality
- ✅ Newsletter subscription
- ✅ Comments system
- ✅ Reading progress bar
- ✅ Bookmark/save articles
- ✅ Like system
- ✅ Auto-publish every 8 hours
- ✅ Admin panel
- ✅ Dark/light theme
- ✅ Fully responsive

## 🔧 Admin Access:

Access the admin panel at: `https://blog.corecodes.org/admin.html`

No login required (frontend demo).

---

**Ready to deploy to Netlify as a separate site!**
