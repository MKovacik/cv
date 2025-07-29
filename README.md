# Michal Kováčik - CV Website

## Overview

This is a professional CV website built with modern web technologies, featuring a modular architecture with comprehensive error handling and responsive design.

**View online:** [https://mkovacik.github.io/cv/](https://mkovacik.github.io/cv/)  
**To view locally:** Open `index.html` in any web browser.

## Architecture

### Modular JavaScript Structure

The JavaScript codebase has been refactored into a modular architecture for better maintainability, error handling, and code organization:

```
js/
├── core/
│   ├── main.js           # Main application controller
│   ├── utils.js          # Core utility functions
│   └── errorHandler.js   # Centralized error handling
└── modules/
    ├── profileManager.js     # Profile image switching & animations
    ├── galleryManager.js     # Image gallery functionality
    ├── achievementsManager.js # Achievement toggles
    └── uiManager.js         # UI animations & scroll indicators
```

### Modular CSS Structure

The CSS has been organized into a maintainable modular structure:

```
css/
├── main.css              # Main import file
├── core/
│   ├── variables.css     # CSS custom properties
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
│   └── animations.css   # Animation utilities
└── utils/
    ├── responsive.css   # Responsive utilities
    ├── accessibility.css # A11y improvements
    └── print.css        # Print styles
```

## Features

### Core Functionality
- **Responsive Design**: Mobile-first approach with breakpoints
- **Image Gallery**: Interactive photo galleries with modal viewing
- **Profile Image Switching**: Automatic switching between profile and company logo on mobile
- **Achievement Toggles**: Expandable achievement sections with animations
- **Print Support**: Optimized print styles for CV printing
- **Error Handling**: Comprehensive error logging and recovery

### Accessibility Features
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **High Contrast Support**: Respects user's contrast preferences
- **Reduced Motion Support**: Respects user's motion preferences
- **Focus Management**: Clear focus indicators and logical tab order

### Performance Features
- **Module Loading**: ES6 modules with fallback support
- **Lazy Loading**: Optimized resource loading
- **Debounced Events**: Performance-optimized event handlers
- **Error Recovery**: Automatic module recovery on failures

## Browser Support

### Modern Browsers (ES6 Module Support)
- Chrome 61+
- Firefox 60+
- Safari 10.1+
- Edge 16+

### Legacy Browser Support
The application includes a fallback system that automatically detects module support and falls back to legacy JavaScript for older browsers.

## Development

### Testing
The modular system includes comprehensive error handling and automatic fallback to legacy code for older browsers.

### Error Handling Strategy
The application implements a comprehensive error handling system with module-level error handling, centralized logging, graceful degradation, recovery mechanisms, and optional user feedback.

## Deployment

To view locally, open `index.html` in any web browser. The modular system will automatically load in supported browsers, with legacy fallback for older browsers.
