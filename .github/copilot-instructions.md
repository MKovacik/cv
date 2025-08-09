# CV Website - Static Interactive Resume

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Overview

This is a static HTML/CSS/JavaScript CV website for Michal Kováčik featuring a modular architecture with interactive elements, responsive design, and comprehensive fallback support. The site is hosted on GitHub Pages at [https://mkovacik.github.io/cv/](https://mkovacik.github.io/cv/).

**CRITICAL: This is a STATIC WEBSITE with NO BUILD SYSTEM. Do not look for package.json, build scripts, or dependency management - none exist.**

## Quick Start (Essential Commands)

Start local development immediately:
```bash
cd /path/to/cv
python3 -m http.server 8000
# Open http://localhost:8000/ in browser
```

**Timing: Server starts instantly (< 1 second). No dependencies to install.**

## Development Workflow

### Working Effectively

1. **Start Local Server:**
   ```bash
   cd /home/runner/work/cv/cv
   python3 -m http.server 8000 &
   ```
   - **NEVER CANCEL** - Server starts immediately, no timeout concerns
   - Access at `http://localhost:8000/`

2. **Primary Development Steps:**
   - Edit HTML/CSS/JS files directly in your editor
   - Refresh browser to see changes instantly (no build step)
   - Test both `index.html` (main CV) and `profile.html` (leadership profile)

3. **File Structure (Critical Paths):**
   ```
   /home/runner/work/cv/cv/
   ├── index.html              # Main CV page
   ├── profile.html            # Leadership profile page  
   ├── script.js               # Fallback JavaScript
   ├── css/
   │   ├── main.css           # Main CSS imports
   │   ├── core/              # Variables, reset styles
   │   ├── layout/            # Container, header, footer
   │   ├── components/        # Interactive components
   │   └── utils/             # Responsive, accessibility
   └── js/
       ├── core/              # Main application logic
       └── modules/           # Feature-specific modules
   ```

### Validation & Testing

**MANDATORY: Always test both pages and all interactive features after making changes.**

1. **Complete Validation Workflow:**
   ```bash
   # Start server
   python3 -m http.server 8000 &
   
   # Manual testing checklist:
   # ✓ Open http://localhost:8000/ - main CV loads
   # ✓ Click "View Achievements" buttons - sections expand
   # ✓ Click 📸 gallery icons - modals open with images
   # ✓ Navigate to profile.html via header link
   # ✓ Click "Proven" buttons on profile page - evidence appears
   # ✓ Use back button to return to main CV
   # ✓ Test help/tour guide button (? icon)
   # ✓ Verify responsive design at 375px, 768px, 1024px widths
   # ✓ Check external links open in new tabs
   ```

2. **Browser Compatibility Testing:**
   - Modern browsers (Chrome 61+, Firefox 60+, Safari 10.1+, Edge 16+) use ES6 modules
   - Older browsers automatically fall back to `script.js`
   - **Test both fallback and modern paths when making changes**

3. **Critical User Scenarios (MANDATORY):**
   - **Main CV Navigation:** Start → expand achievements → view galleries → navigate to profile
   - **Profile Page Interaction:** Use "Proven" buttons → read evidence → return to main CV
   - **Mobile Experience:** Test responsive behavior and touch interactions
   - **Tour Guide System:** Verify help functionality works on both pages

### External Dependencies

**No installation required** - uses CDNs:
- Font Awesome icons: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`
- Google Fonts: `https://fonts.googleapis.com/css2?family=Roboto...`
- Images: `https://media.githubusercontent.com/media/MKovacik/cv/main/img/...`

**Note:** CDNs may be blocked in sandboxed environments - this is normal and doesn't affect functionality.

## Architecture & Code Organization

### Modular CSS System
- **Entry point:** `css/main.css` imports all modules
- **Core styles:** Variables, reset, base styling
- **Layout:** Container system, header/footer structure
- **Components:** Interactive elements (galleries, achievements, buttons)
- **Utilities:** Responsive design, accessibility, print styles

### JavaScript Architecture
- **Modern browsers:** ES6 modules in `js/core/` and `js/modules/`
- **Legacy browsers:** Comprehensive fallback in `script.js`
- **Auto-detection:** Browsers automatically choose appropriate system
- **Error handling:** Graceful degradation with centralized error management

### Interactive Features

1. **Achievement Toggles** (`index.html`):
   - Click "View Achievements" to expand detailed accomplishments
   - Animated expansion with star-marked list items

2. **Photo Galleries** (`index.html`):
   - Click 📸 icons to open image modals
   - Navigate through event photos with keyboard/mouse

3. **Leadership Proof System** (`profile.html`):
   - Click "Proven" buttons to reveal achievement evidence
   - Each quality has detailed examples from work experience

4. **Tour Guide System** (both pages):
   - Help button (?) provides interactive guidance
   - Numbered indicators highlight key features

5. **Responsive Navigation:**
   - Profile image links between pages
   - Prominent back button on profile page
   - Mobile-first responsive design

## Common Development Tasks

### Adding New Content
1. **Edit HTML directly** - no build process needed
2. **Add CSS to appropriate module** in `css/` directory structure
3. **Test immediately** by refreshing browser
4. **Validate interactive features** still work correctly

### Modifying Styles
- **Never edit CSS directly in browser dev tools** - changes will be lost
- **Edit source files** in the modular CSS structure
- **Use CSS custom properties** defined in `css/core/variables.css`

### Debugging Interactive Features
1. **Check browser console** for JavaScript errors
2. **Verify both modern and fallback systems** work
3. **Test on multiple viewport sizes** for responsive issues
4. **Validate accessibility** with keyboard navigation

### Performance Optimization
- **Images are optimized** and served via Git LFS
- **CSS modules are lightweight** and load efficiently
- **JavaScript is progressively enhanced** with fallbacks
- **No build optimization needed** - static files only

## Deployment

### GitHub Pages Deployment
- **Automatic:** Push to main branch triggers deployment
- **URL:** https://mkovacik.github.io/cv/
- **No build step:** Static files deploy directly

### Local Testing
```bash
# Start development server
python3 -m http.server 8000

# Test specific pages
open http://localhost:8000/          # Main CV
open http://localhost:8000/profile.html  # Profile page
```

## Error Troubleshooting

### Common Issues & Solutions

1. **CDN Resources Blocked (Normal in Sandboxed Environments):**
   - Console shows `ERR_BLOCKED_BY_CLIENT` for external resources
   - **This is expected** - local functionality still works
   - Fallback fonts and functionality activate automatically

2. **Interactive Features Not Working:**
   - Check console for JavaScript errors
   - Verify you're testing both pages (`index.html` and `profile.html`)
   - Clear browser cache if needed

3. **Responsive Design Issues:**
   - Test at multiple viewport widths: 375px (mobile), 768px (tablet), 1024px+ (desktop)
   - Use browser dev tools responsive mode

4. **Navigation Problems:**
   - Ensure `profile.html` and `index.html` are in same directory
   - Check link paths are relative (not absolute)

### Browser Console Monitoring

**Expected console output (normal operation):**
```
✅ CV Application loaded successfully
✅ ProfileManager initialized successfully
✅ UIManager initialized successfully
✅ AchievementsManager initialized successfully
✅ GalleryManager initialized successfully
✅ TourGuideManager initialized successfully
```

**Error patterns to investigate:**
- DOM errors when elements aren't found (may need HTML updates)
- Module loading failures (check file paths)
- Event listener failures (may indicate JavaScript syntax errors)

## Validation Checklist

Before committing changes, verify:

- [ ] **Main CV page loads completely** at `http://localhost:8000/`
- [ ] **Achievement sections expand** when clicking "View Achievements"
- [ ] **Gallery modals open** when clicking 📸 icons
- [ ] **Profile page loads** via header navigation
- [ ] **"Proven" buttons work** on profile page
- [ ] **Back navigation works** from profile to main CV
- [ ] **Help system functions** on both pages
- [ ] **Responsive design works** at mobile (375px) and desktop (1024px+) widths
- [ ] **External links open** in new tabs
- [ ] **No JavaScript errors** in browser console
- [ ] **Fallback functionality** works when ES6 modules disabled

## Key Files Reference

### HTML Files
- `index.html` - Main CV with experience, achievements, skills
- `profile.html` - Leadership profile with proven examples

### Essential JavaScript  
- `script.js` - Complete fallback system for all browsers
- `js/core/main.js` - Modern module system entry point
- `js/modules/` - Feature-specific interactive modules

### Critical CSS
- `css/main.css` - Main import file for all styles
- `css/components/` - Interactive component styling
- `css/utils/responsive.css` - Mobile-first responsive rules

### Assets
- `img/` - All images served via Git LFS
- `.gitattributes` - Git LFS configuration for images

**Remember: This is a static website. Edit files directly, refresh browser, validate functionality. No build tools, no dependencies, no compilation step required.**