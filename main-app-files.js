// src/pages/_app.js
import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Enhance your text-to-video prompts with cinematic elements" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

// src/pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="Enhance your text-to-video prompts with cinematic elements" />
          <meta name="keywords" content="text-to-video, AI, prompt engineering, cinematic, video generation" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure image domains if needed
  images: {
    domains: [],
  },
};

module.exports = nextConfig;

// package.json
{
  "name": "prompt-optimizer",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "next": "^13.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-select": "^5.7.0",
    "react-syntax-highlighter": "^15.5.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.4.3",
    "eslint": "^8.38.0",
    "eslint-config-next": "^13.4.0",
    "jest": "^29.5.0",
    "jest-environment-jsdom": "^29.5.0"
  }
}

// netlify.toml
[build]
  command = "npm run build"
  publish = ".next"
  functions = "netlify/functions"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[dev]
  command = "npm run dev"
  port = 8888
  publish = ".next"

# netlify/functions/save-prompt.js
exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    const { basicPrompt, enhancedPrompt } = data;

    // Validate the data
    if (!basicPrompt || !enhancedPrompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" })
      };
    }

    // Here you could save the data to a database
    // For now, we'll just return a success response with the data
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Prompt saved successfully",
        data: { basicPrompt, enhancedPrompt },
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error("Error saving prompt:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to save prompt" })
    };
  }
};

// README.md
# Text-to-Video Prompt Optimizer

A web application that enhances basic text prompts with cinematic elements for better text-to-video generation results.

## Features

- Interactive prompt enhancement interface
- Comprehensive library of cinematic terminology and film modifiers
- Predefined style presets for quick application
- Example prompts for learning and inspiration
- Detailed documentation

## Technologies Used

- Next.js
- React
- Netlify for deployment
- Serverless functions

## Getting Started

### Prerequisites

- Node.js 14.x or higher
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

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is configured for easy deployment to Netlify:

1. Push your code to a GitHub repository
2. Connect the repository to Netlify
3. Netlify will automatically detect the Next.js project and configure the build settings

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the Nova Reel Prompt Optimizer and Prompt-A-Video projects