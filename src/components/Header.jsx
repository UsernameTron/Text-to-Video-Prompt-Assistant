import React from 'react';
import Link from 'next/link';

/**
 * Header component for the application navigation
 * 
 * @returns {React.ReactElement} The header component with navigation
 */
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="site-title">Text-to-Video Prompt Optimizer</h1>
        <nav className="main-nav" aria-label="Main navigation">
          <ul>
            <li>
              <Link href="/" className="nav-link" aria-label="Home">
                Home
              </Link>
            </li>
            <li>
              <Link href="/enhancer" className="nav-link" aria-label="Prompt Enhancer">
                Prompt Enhancer
              </Link>
            </li>
            <li>
              <Link href="/examples" className="nav-link" aria-label="Examples">
                Examples
              </Link>
            </li>
            <li>
              <Link href="/docs" className="nav-link" aria-label="Documentation">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="/about" className="nav-link" aria-label="About">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;