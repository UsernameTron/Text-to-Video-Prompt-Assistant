# Text-to-Video Prompt Optimizer

A web application that enhances basic text prompts with cinematic elements for better text-to-video generation results.

## Features

- Interactive prompt enhancement interface
- Comprehensive library of cinematic terminology and film modifiers
- Predefined style presets for quick application
- Example prompts for learning and inspiration
- Detailed documentation
- Accessibility support for keyboard navigation and screen readers

## Technologies Used

- Next.js 13+
- React 18
- Netlify for deployment
- Serverless functions
- Jest and React Testing Library for testing

## Getting Started

### Prerequisites

- Node.js 18.x or higher (required for Next.js 13.4+)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/prompt-optimizer.git
   cd prompt-optimizer
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create environment variables
   ```bash
   cp .env.local.example .env.local
   # Then edit .env.local with your settings
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Repository Structure

This project is organized as a standard Next.js application:

```
/
├── public/            # Static assets and resources
├── src/
│   ├── components/    # React components
│   ├── pages/         # Next.js pages
│   ├── styles/        # CSS and styling
│   └── utils/         # Utility functions
├── netlify/
│   └── functions/     # Serverless functions
└── scripts/          # Build and deployment scripts
```

### Important Note on File Structure

This repository previously contained concatenated files like:
- `utility-functions.js`
- `main-app-files.js`
- `components.txt`

These files should **not** be used in development or deployment as they cause module conflicts. Instead, use the individual files in their proper directories.

## Deployment

This project is configured for easy deployment to Netlify:

1. Run `npm run clean` to remove any problematic concatenated files
2. Run `npm run predeploy` to verify deployment readiness
3. Push your code to a GitHub repository
4. Connect the repository to Netlify
5. Configure environment variables in Netlify dashboard
6. Netlify will automatically deploy your application

For detailed deployment instructions, see the [deployment guide](deployment-guide.txt).

## Accessibility

This application follows WCAG 2.1 AA guidelines, including:

- Proper ARIA attributes for interactive elements
- Keyboard navigation support
- Screen reader-friendly content structure
- Color contrast compliance
- Focus management for interactive components

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the Nova Reel Prompt Optimizer and Prompt-A-Video projects