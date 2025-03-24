import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';

/**
 * Main application component that wraps all pages
 * 
 * @param {Object} props - Component properties
 * @param {React.ComponentType} props.Component - Page component to render
 * @param {Object} props.pageProps - Props to pass to the page
 * @returns {React.ReactElement} The app component
 */
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Enhance your text-to-video prompts with cinematic elements" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}