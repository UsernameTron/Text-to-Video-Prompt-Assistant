import React from 'react';
import { STYLE_PRESETS } from '../utils/filmEffects';

/**
 * StylePresets component for quickly applying predefined style presets
 * 
 * @param {Object} props - Component properties
 * @param {Function} props.onSelectStyle - Callback when a style is selected
 * @returns {React.ReactElement} The style presets component
 */
const StylePresets = ({ onSelectStyle }) => {
  const presets = Object.keys(STYLE_PRESETS);

  return (
    <div className="style-presets">
      <h3 id="style-presets-heading">Style Presets</h3>
      <p>Quick-apply cinematic styles to your prompt</p>
      <div 
        className="style-buttons" 
        role="group" 
        aria-labelledby="style-presets-heading"
      >
        {presets.map(presetId => (
          <button
            key={presetId}
            onClick={() => onSelectStyle(presetId)}
            className="btn btn-style"
            aria-label={`Apply ${STYLE_PRESETS[presetId].name} style`}
            title={STYLE_PRESETS[presetId].description}
          >
            {STYLE_PRESETS[presetId].name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StylePresets;