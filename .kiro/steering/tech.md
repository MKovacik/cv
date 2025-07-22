# Technology Stack

## Core Technologies
- **HTML5**: Semantic markup with proper accessibility attributes
- **CSS3**: Modern styling with CSS custom properties (variables) and flexbox/grid layouts
- **Vanilla JavaScript**: No frameworks, pure DOM manipulation and event handling

## External Dependencies
- **Font Awesome 6.4.0**: Icon library via CDN
- **Google Fonts**: Roboto and Poppins font families
- **AOS (Animate On Scroll)**: Animation library for scroll-triggered effects

## CSS Architecture
- CSS custom properties for consistent theming and color management
- Mobile-first responsive design approach
- Modular CSS files:
  - `styles.css`: Main CV page styles
  - `profile-styles.css`: Profile page specific styles
  - `leadership-styles.css`: Leadership section styles

## JavaScript Patterns
- Event-driven architecture using `DOMContentLoaded`
- Modular script files for different page functionality
- Configuration objects for gallery and interactive elements
- Progressive enhancement approach

## Build & Deployment
- **No build process required** - static files served directly
- **GitHub Pages deployment**: Automatic deployment from main branch
- **Local development**: Open `index.html` directly in browser
- **Asset hosting**: Images served via GitHub LFS media URLs

## Browser Support
- Modern browsers with ES6+ support
- Responsive design for mobile and desktop viewports
- Graceful degradation for older browsers

## Performance Considerations
- Minimal external dependencies
- Optimized images via GitHub LFS
- CSS and JS files kept lightweight
- CDN usage for external libraries