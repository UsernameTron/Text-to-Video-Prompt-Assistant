import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Custom Document component for Next.js
 * 
 * This component customizes the HTML document structure
 * 
 * @returns {React.ReactElement} The custom document component
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Enhance your text-to-video prompts with cinematic elements" />
        <meta name="keywords" content="text-to-video, AI, prompt engineering, cinematic, video generation" />
        <meta name="theme-color" content="#3a86ff" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}