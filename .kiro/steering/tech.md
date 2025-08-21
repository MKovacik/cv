# Technology Stack

## Core Technologies
- **HTML5**: Semantic markup with proper accessibility attributes and ARIA labels
- **CSS3**: Modern styling with CSS custom properties, flexbox/grid layouts, and modular architecture
- **ES6+ JavaScript**: Modern JavaScript with modules, async/await, and comprehensive error handling
- **Vanilla JavaScript**: No frameworks, pure DOM manipulation with modular design patterns

## External Dependencies
- **Font Awesome 6.4.0**: Icon library via CDN
- **Google Fonts**: Roboto and Poppins font families
- **AOS (Animate On Scroll)**: Animation library for scroll-triggered effects (profile page)

## Modular CSS Architecture
```
css/
├── main.css              # Main import file
├── core/
│   ├── variables.css     # CSS custom properties & theming
│   └── reset.css        # CSS reset & base styles
├── layout/
│   ├── container.css    # Layout containers
│   ├── header.css       # Header styling
│   └── footer.css       # Footer styling
├── components/
│   ├── gallery.css      # Gallery component styles
│   ├── achievements.css # Achievement component styles
│   ├── skills.css       # Skills section styles
│   ├── buttons.css      # Button styles
│   ├── animations.css   # Animation utilities
│   ├── tour-guide.css   # Tour guide component styles
│   └── profile.css      # Profile page specific styles
└── utils/
    ├── responsive.css   # Responsive utilities
    ├── accessibility.css # A11y improvements
    └── print.css        # Print styles
```

## Modular JavaScript Architecture
```
js/
├── core/
│   ├── main.js           # Main application controller & module loader
│   ├── utils.js          # Core utility functions
│   └── errorHandler.js   # Centralized error handling & logging
└── modules/
    ├── profileManager.js     # Profile image switching & animations
    ├── galleryManager.js     # Image gallery functionality
    ├── achievementsManager.js # Achievement toggles
    ├── tourGuideManager.js   # Interactive tour guide system
    └── uiManager.js         # UI animations & scroll indicators
```

## JavaScript Patterns
- **ES6 Module System**: Dynamic imports with fallback support
- **Error-First Design**: Comprehensive error handling and recovery
- **Progressive Enhancement**: Graceful degradation for older browsers
- **Event-driven Architecture**: Centralized event management
- **Configuration Objects**: Modular configuration for galleries and features
- **Async/Await**: Modern asynchronous programming patterns

## Build & Deployment
- **No build process required** - static files served directly
- **GitHub Pages deployment**: Automatic deployment from main branch
- **Local development**: Open `index.html` directly in browser
- **Asset hosting**: Images served via GitHub LFS media URLs
- **Module Loading**: Automatic detection of ES6 support with fallback

## Browser Support
### Modern Browsers (ES6 Module Support)
- Chrome 61+
- Firefox 60+
- Safari 10.1+
- Edge 16+

### Legacy Browser Support
- Comprehensive fallback system in `script.js`
- Automatic module support detection
- Graceful degradation of interactive features
- Basic functionality maintained across all browsers

## Performance & Accessibility
- **Module Loading**: ES6 modules with performance-optimized loading
- **Lazy Loading**: Optimized resource loading strategies
- **Debounced Events**: Performance-optimized event handlers
- **Error Recovery**: Automatic module recovery on failures
- **A11y Compliance**: Full keyboard navigation and screen reader support
- **Print Optimization**: Dedicated print styles for CV printing
- **Reduced Motion**: Respects user motion preferences