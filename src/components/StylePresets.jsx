import React from 'react';
import stylePresets from '../utils/stylePresets';

/**
 * StylePresets component for quickly applying predefined style presets
 * 
 * @param {Object} props - Component properties
 * @param {Function} props.onSelectStyle - Callback when a style is selected
 * @returns {React.ReactElement} The style presets component
 */
const StylePresets = ({ onSelectStyle }) => {
  const styles = Object.keys(stylePresets);

  return (
    <div className="style-presets">
      <h3 id="style-presets-heading">Style Presets</h3>
      <p>Quick-apply cinematic styles to your prompt</p>
      <div 
        className="style-buttons" 
        role="group" 
        aria-labelledby="style-presets-heading"
      >
        {styles.map(style => (
          <button
            key={style}
            onClick={() => onSelectStyle(style)}
            className="btn btn-style"
            aria-label={`Apply ${style} style`}
          >
            {style.charAt(0).toUpperCase() + style.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StylePresets;