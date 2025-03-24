import React, { useState } from 'react';
import { FILM_EFFECTS_CATEGORIES, FILM_EFFECTS_LIBRARY } from '../utils/filmEffects';

/**
 * FilmEffectsSelector component for selecting film effects by category
 * 
 * @param {Object} props - Component properties
 * @param {string[]} props.selectedEffects - Array of selected effect IDs
 * @param {Function} props.onEffectChange - Callback when an effect is selected/deselected
 * @returns {React.ReactElement} The film effects selector component
 */
const FilmEffectsSelector = ({ selectedEffects = [], onEffectChange }) => {
  const [activeCategory, setActiveCategory] = useState(Object.values(FILM_EFFECTS_CATEGORIES)[0]);

  /**
   * Toggle an effect selection
   * @param {string} effectId - ID of the effect to toggle
   */
  const handleEffectToggle = (effectId) => {
    if (selectedEffects.includes(effectId)) {
      // Remove the effect
      onEffectChange(selectedEffects.filter(id => id !== effectId));
    } else {
      // Add the effect
      onEffectChange([...selectedEffects, effectId]);
    }
  };

  return (
    <div className="film-effects-selector">
      <h3 id="film-effects-heading">Cinematic Elements</h3>
      <p>Select film elements to enhance your prompt with cinematic quality</p>
      
      <div className="categories-tabs">
        {Object.values(FILM_EFFECTS_CATEGORIES).map(category => (
          <button
            key={category}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="effects-grid" role="listbox" aria-labelledby="film-effects-heading">
        {FILM_EFFECTS_LIBRARY[activeCategory]?.map(effect => (
          <div 
            key={effect.id}
            className={`effect-item ${selectedEffects.includes(effect.id) ? 'selected' : ''}`}
            onClick={() => handleEffectToggle(effect.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleEffectToggle(effect.id);
              }
            }}
            role="option"
            aria-selected={selectedEffects.includes(effect.id)}
            tabIndex={0}
          >
            <div className="effect-name">{effect.name}</div>
            <div className="effect-description">{effect.description}</div>
          </div>
        ))}
      </div>
      
      {selectedEffects.length > 0 && (
        <div className="selected-effects-summary">
          <h4>Selected Effects ({selectedEffects.length})</h4>
          <button 
            className="clear-all-button"
            onClick={() => onEffectChange([])}
          >
            Clear All
          </button>
          <div className="selected-tags">
            {selectedEffects.map(effectId => {
              // Find the effect in the library
              let effectName = '';
              for (const category in FILM_EFFECTS_LIBRARY) {
                const effect = FILM_EFFECTS_LIBRARY[category].find(e => e.id === effectId);
                if (effect) {
                  effectName = effect.name;
                  break;
                }
              }
              
              return (
                <div key={effectId} className="effect-tag">
                  {effectName}
                  <button 
                    className="remove-effect" 
                    onClick={() => handleEffectToggle(effectId)}
                    aria-label={`Remove ${effectName}`}
                  >
                    &times;
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmEffectsSelector;