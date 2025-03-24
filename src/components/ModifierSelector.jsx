import React, { useState, useEffect } from 'react';

/**
 * ModifierSelector component for selecting specific modifiers for each category
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.suggestions - Object with category-based modifier suggestions
 * @param {Function} props.onModifiersChange - Callback when modifiers are changed
 * @returns {React.ReactElement} The modifier selector component
 */
const ModifierSelector = ({ suggestions, onModifiersChange }) => {
  const [selectedModifiers, setSelectedModifiers] = useState({});

  useEffect(() => {
    // Initialize with empty selections
    const initialSelections = {};
    Object.keys(suggestions).forEach(category => {
      initialSelections[category] = '';
    });
    setSelectedModifiers(initialSelections);
  }, [suggestions]);

  /**
   * Handle modifier selection change
   * @param {string} category - Category being modified
   * @param {string} value - Selected value
   */
  const handleModifierChange = (category, value) => {
    const updatedModifiers = {
      ...selectedModifiers,
      [category]: value
    };
    setSelectedModifiers(updatedModifiers);
    onModifiersChange(updatedModifiers);
  };

  return (
    <div className="modifier-selector">
      <h3 id="modifiers-heading">Select Modifiers</h3>
      {Object.keys(suggestions).length === 0 ? (
        <p>No suggestions available. Please select categories first.</p>
      ) : (
        <div className="modifiers-grid" aria-labelledby="modifiers-heading" role="group">
          {Object.entries(suggestions).map(([category, options]) => (
            <div key={category} className="modifier-group">
              <label htmlFor={`modifier-${category}`}>
                {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </label>
              <select
                id={`modifier-${category}`}
                value={selectedModifiers[category] || ''}
                onChange={(e) => handleModifierChange(category, e.target.value)}
                className="form-select"
                aria-label={`Select ${category.replace(/_/g, ' ')} modifier`}
              >
                <option value="">Select an option</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModifierSelector;