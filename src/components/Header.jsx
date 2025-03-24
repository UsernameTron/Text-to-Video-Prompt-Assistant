import React from 'react';

/**
 * Header component for the application
 * 
 * @returns {React.ReactElement} The header component
 */
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="site-title">Text-to-Video Prompt Optimizer</h1>
      </div>
    </header>
  );
};

export default Header;