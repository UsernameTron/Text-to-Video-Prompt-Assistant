import React, { useState } from 'react';

/**
 * PromptInput component for entering basic prompt text
 * 
 * @param {Object} props - Component properties
 * @param {Function} props.onSubmit - Function to call when form is submitted
 * @param {string} [props.initialValue=''] - Initial value for the text area
 * @param {string} [props.placeholder='Enter a basic scene description...'] - Placeholder text
 * @returns {React.ReactElement} The prompt input component
 */
const PromptInput = ({ 
  onSubmit, 
  initialValue = '', 
  placeholder = 'Enter a basic scene description...' 
}) => {
  const [prompt, setPrompt] = useState(initialValue);
  const [error, setError] = useState('');

  /**
   * Handle form submission
   * @param {React.FormEvent} e - Form event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    if (!prompt.trim()) {
      setError('Please enter a prompt before submitting');
      return;
    }
    
    // Clear any previous errors
    setError('');
    
    // Call the onSubmit callback
    onSubmit(prompt);
  };

  /**
   * Handle input change
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - Change event
   */
  const handleChange = (e) => {
    setPrompt(e.target.value);
    
    // Clear error when user starts typing
    if (error && e.target.value.trim()) {
      setError('');
    }
  };

  return (
    <div className="prompt-input">
      <form onSubmit={handleSubmit} aria-label="Prompt input form">
        <div className="form-group">
          <label htmlFor="basic-prompt">Basic Prompt</label>
          <textarea
            id="basic-prompt"
            value={prompt}
            onChange={handleChange}
            placeholder={placeholder}
            rows={3}
            className={`form-control ${error ? 'error-border' : ''}`}
            aria-required="true"
            aria-invalid={!!error}
            aria-describedby={error ? 'prompt-error' : undefined}
          />
          {error && (
            <div id="prompt-error" className="error-message" role="alert">
              {error}
            </div>
          )}
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          aria-label="Generate enhancement suggestions"
        >
          Suggest Enhancements
        </button>
      </form>
    </div>
  );
};

export default PromptInput;