import React, { useState } from 'react';

/**
 * EnhancedPrompt component displays the enhanced prompt and provides copy functionality
 * 
 * @param {Object} props - Component properties
 * @param {string} props.enhancedPrompt - The enhanced prompt text to display
 * @returns {React.ReactElement} The enhanced prompt component
 */
const EnhancedPrompt = ({ enhancedPrompt }) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  /**
   * Copies the enhanced prompt to the clipboard
   */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(enhancedPrompt);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2000);
    }
  };

  return (
    <div className="enhanced-prompt">
      <h3 id="enhanced-prompt-heading">Enhanced Prompt</h3>
      <div 
        className="prompt-display" 
        aria-labelledby="enhanced-prompt-heading"
        tabIndex={0}
        role="region"
      >
        <p>{enhancedPrompt || 'Your enhanced prompt will appear here'}</p>
      </div>
      {enhancedPrompt && (
        <button 
          onClick={copyToClipboard} 
          className="btn btn-secondary"
          disabled={copied}
          aria-label="Copy enhanced prompt to clipboard"
          aria-live="polite"
        >
          {copied ? 'Copied!' : copyError ? 'Failed to copy' : 'Copy to Clipboard'}
        </button>
      )}
      {copyError && (
        <div className="error-message" role="alert">
          <p>Unable to copy to clipboard. Please select the text manually.</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedPrompt;