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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}