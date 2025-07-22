# Project Structure

## Root Level Files
- `index.html`: Main CV page with complete professional experience
- `profile.html`: Extended profile page with leadership qualities and detailed skills
- `README.md`: Project documentation and setup instructions

## Stylesheets
- `styles.css`: Main CV page styling with Telekom branding
- `profile-styles.css`: Profile page specific styles with enhanced animations
- `leadership-styles.css`: Leadership section styling for interactive elements

## JavaScript Files
- `script.js`: Main CV page functionality (image galleries, mobile interactions)
- `profile-script.js`: Profile page animations and interactive effects
- `leadership-script.js`: Leadership qualities section with proof toggles

## Assets Organization
- `img/`: Main image directory
  - `img/events/`: Event photos organized by conference/event name
    - `AllLeadsEssen2024/`, `Hackathons/`, `Techcelerate2024/`, `WeAreDevelopers/`
  - Company logos and profile photos at root level
  - `favicon.ico`: Site favicon
- `pic/`: Empty placeholder directory structure (mirrors img structure)

## Configuration Files
- `.gitattributes`: Git LFS configuration for large files
- `.git/`: Git repository metadata
- `.kiro/`: Kiro AI assistant configuration and steering rules

## Naming Conventions
- **Files**: kebab-case for multi-word files (`profile-styles.css`)
- **CSS Classes**: kebab-case (`.leadership-quality`, `.skill-tag`)
- **JavaScript**: camelCase for variables and functions
- **IDs**: kebab-case for HTML element IDs
- **Images**: Descriptive names with event/context prefixes

## Page Structure Pattern
Each HTML page follows consistent structure:
1. DOCTYPE and meta tags with proper viewport settings
2. External CDN resources (Font Awesome, Google Fonts)
3. Local stylesheet imports
4. Semantic HTML5 structure (header, main, sections, footer)
5. Script imports at end of body

## Responsive Design Approach
- Mobile-first CSS with progressive enhancement
- Breakpoint at 768px for mobile/desktop distinction
- Flexible grid layouts using CSS Grid and Flexbox
- Scalable typography using relative units