# Project Structure

## Root Level Files
- `index.html`: Main CV page with complete professional experience
- `profile.html`: Extended profile page with leadership qualities and detailed skills
- `script.js`: Legacy fallback JavaScript for older browsers
- `README.md`: Comprehensive project documentation and architecture guide

## Modular CSS Architecture
```
css/
├── main.css              # Main import file that loads all modules
├── core/
│   ├── variables.css     # CSS custom properties & Telekom branding colors
│   └── reset.css        # CSS reset & base styles
├── layout/
│   ├── container.css    # Layout containers & responsive grid
│   ├── header.css       # Header styling with gradient backgrounds
│   └── footer.css       # Footer styling
├── components/
│   ├── gallery.css      # Image gallery modal & interactions
│   ├── achievements.css # Expandable achievement sections
│   ├── skills.css       # Skill tags & hover animations
│   ├── buttons.css      # Button styles & hover effects
│   ├── animations.css   # Animation utilities & keyframes
│   ├── tour-guide.css   # Interactive tour guide system
│   └── profile.css      # Profile page specific components
└── utils/
    ├── responsive.css   # Mobile-first responsive utilities
    ├── accessibility.css # A11y improvements & focus management
    └── print.css        # Print-optimized styles for CV
```

## Modular JavaScript Architecture
```
js/
├── core/
│   ├── main.js           # Main application controller & ES6 module loader
│   ├── utils.js          # Core utility functions & helpers
│   └── errorHandler.js   # Centralized error handling & logging
└── modules/
    ├── profileManager.js     # Profile image switching & mobile interactions
    ├── galleryManager.js     # Image gallery functionality & modal system
    ├── achievementsManager.js # Achievement section toggles & animations
    ├── tourGuideManager.js   # Interactive tour guide with numbered indicators
    └── uiManager.js         # UI animations, scroll indicators & interactions
```

## Alternative Implementations
- `alt-cv/`: Alternative CV implementation created by GitHub Copilot
  - `alt-index.html`: Alternative main page
  - `alt-script.js`: Alternative JavaScript implementation
  - `alt-style.css`: Alternative styling approach

## Assets Organization
- `img/`: Main image directory with GitHub LFS integration
  - `img/events/`: Event photos organized by conference/event name
    - `AllLeadsEssen2024/`: All Leads conference photos
    - `Hackathons/`: Developer hackathon photos
    - `Techcelerate2024/`: Techcelerate conference photos
    - `WeAreDevelopers/`: WeAreDevelopers conference photos
  - Company logos: `DTE.DE-944bd2b4.png`, `Siemens-Logo.png`, `Ness.jpeg`
  - Profile photo: `MK_Formal_01.jpg`
  - `favicon.ico`: Site favicon

## Configuration Files
- `.gitattributes`: Git LFS configuration for large image files
- `.git/`: Git repository metadata
- `.github/`: GitHub-specific configuration
  - `copilot-instructions.md`: GitHub Copilot guidance
- `.kiro/`: Kiro AI assistant configuration
  - `steering/`: AI assistant steering rules and project context
- `.claude/`: Claude AI assistant settings

## Naming Conventions
- **Files**: kebab-case for multi-word files (`tour-guide.css`, `profile-manager.js`)
- **CSS Classes**: kebab-case with BEM-like structure (`.leadership-quality`, `.skill-tag`, `.tour-container`)
- **JavaScript**: camelCase for variables and functions (`profileManager`, `toggleAchievements`)
- **CSS Custom Properties**: kebab-case with descriptive prefixes (`--primary-color`, `--card-shadow`)
- **IDs**: kebab-case for HTML element IDs (`profile-image`, `current-year`)
- **Images**: Descriptive names with context prefixes (`MK_Formal_01.jpg`, `DTE.DE-944bd2b4.png`)

## Page Structure Pattern
Each HTML page follows consistent structure:
1. DOCTYPE and meta tags with proper viewport settings
2. External CDN resources (Font Awesome, Google Fonts)
3. Modular CSS import via `css/main.css`
4. Semantic HTML5 structure (header, main, sections, footer)
5. Legacy fallback script (`script.js`) at end of body
6. Modern browsers automatically load ES6 modules via dynamic imports

## Module Loading Strategy
- **Modern Browsers**: ES6 modules loaded dynamically via `js/core/main.js`
- **Legacy Browsers**: Comprehensive fallback in `script.js` with feature detection
- **Error Recovery**: Automatic fallback if module loading fails
- **Progressive Enhancement**: Core functionality works without JavaScript

## Responsive Design Approach
- Mobile-first CSS with progressive enhancement
- Primary breakpoint at 768px for mobile/desktop distinction
- Flexible grid layouts using CSS Grid and Flexbox
- Scalable typography using relative units (rem, em)
- Touch-friendly interactions on mobile devices
- Print-optimized layouts for CV printing