import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';

/**
 * Home page component
 * 
 * @returns {React.ReactElement} The home page
 */
const HomePage = () => {
  return (
    <div className="page">
      <Head>
        <title>Text-to-Video Prompt Optimizer</title>
        <meta name="description" content="Enhance your text-to-video prompts with cinematic elements for better AI video generation" />
      </Head>
      
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      <Header />
      
      <main id="main-content">
        <div className="container">
          <section className="hero" aria-labelledby="hero-heading">
            <h1 id="hero-heading">Text-to-Video Prompt Optimizer</h1>
            <p className="hero-subtitle">
              Enhance your basic text prompts with cinematic elements for more compelling text-to-video generation results
            </p>
            <div className="hero-buttons">
              <Link href="/enhancer" className="btn btn-primary" aria-label="Try the prompt enhancer">
                Try It Now
              </Link>
              <Link href="/examples" className="btn btn-outline" aria-label="View example prompts">
                View Examples
              </Link>
            </div>
          </section>
          
          <section className="features" aria-labelledby="features-heading">
            <h2 id="features-heading">Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>Comprehensive Modifiers</h3>
                <p>Access a vast library of cinematic terminology and modifiers organized into intuitive categories.</p>
              </div>
              <div className="feature-card">
                <h3>Style Presets</h3>
                <p>Apply predefined styles like cinematic, documentary, noir, or sci-fi with a single click.</p>
              </div>
              <div className="feature-card">
                <h3>Learning Resources</h3>
                <p>Explore example prompts and documentation to learn effective text-to-video prompt techniques.</p>
              </div>
              <div className="feature-card">
                <h3>Accessibility Focused</h3>
                <p>Designed with keyboard navigation, screen reader support, and WCAG compliance in mind.</p>
              </div>
            </div>
          </section>
          
          <section className="how-it-works" aria-labelledby="how-it-works-heading">
            <h2 id="how-it-works-heading">How It Works</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number" aria-hidden="true">1</div>
                <h3>Enter Your Basic Prompt</h3>
                <p>Start with a simple description of the scene or video you want to create.</p>
              </div>
              <div className="step">
                <div className="step-number" aria-hidden="true">2</div>
                <h3>Select Categories</h3>
                <p>Choose from cinematic categories like shot types, lighting, color grading, and more.</p>
              </div>
              <div className="step">
                <div className="step-number" aria-hidden="true">3</div>
                <h3>Choose Modifiers</h3>
                <p>Select specific cinematic elements to enhance your base prompt.</p>
              </div>
              <div className="step">
                <div className="step-number" aria-hidden="true">4</div>
                <h3>Get Enhanced Prompt</h3>
                <p>Copy your completed prompt to use with any text-to-video AI system.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>
            Text-to-Video Prompt Optimizer - A tool for enhancing text-to-video generation prompts
            with cinematic elements.
          </p>
          <p>
            &copy; {new Date().getFullYear()} - Text-to-Video Prompt Optimizer
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;