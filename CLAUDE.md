# Text-to-Video Prompt Assistant Dev Guidelines

## Build Commands
- `npm install` - Install dependencies
- `npm run dev` - Run development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run all tests
- `npm test -- -t "test name"` - Run specific test

## Code Style Guidelines

### Formatting & Structure
- React components use JSX syntax with functional components
- Use 2 space indentation
- Export components as default at end of file
- Group imports: React first, Next.js, third-party libraries, then local imports

### Naming Conventions
- Components: PascalCase (e.g., `EnhancedPrompt.jsx`)
- Functions/methods: camelCase (e.g., `formatEnhancedPrompt`)
- Files: camelCase for utilities, PascalCase for components
- CSS classes: kebab-case (e.g., `enhanced-prompt`)

### JavaScript Practices
- Use ES6+ features (arrow functions, destructuring, template literals)
- Destructure props in component parameters
- Use React hooks for state management
- Document utility functions with JSDoc comments

### Error Handling
- Use try/catch blocks for async operations
- Provide meaningful error messages with fallbacks
- Use error boundaries for component error handling

### Accessibility
- All interactive elements must have ARIA attributes
- Maintain WCAG 2.1 AA compliance
- Support keyboard navigation