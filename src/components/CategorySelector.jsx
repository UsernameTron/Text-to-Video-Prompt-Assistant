import React from 'react';
import Select from 'react-select';

/**
 * Helper function to format category name for display
 * 
 * @param {string} category - Category name in snake_case
 * @returns {string} Formatted category name
 */
const formatCategoryName = (category) => {
  return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

/**
 * CategorySelector component for selecting enhancement categories
 * 
 * @param {Object} props - Component properties
 * @param {string[]} props.categories - Available categories
 * @param {string[]} props.selectedCategories - Currently selected categories
 * @param {Function} props.onChange - Function to call when selection changes
 * @returns {React.ReactElement} The category selector component
 */
const CategorySelector = ({ categories, selectedCategories, onChange }) => {
  // Check if categories exist and provide defaults if empty
  if (!categories || categories.length === 0) {
    console.warn('No categories provided to CategorySelector');
  }

  // Ensure options is never empty by providing fallbacks
  const options = categories && categories.length > 0 
    ? categories.map(category => ({
        value: category,
        label: formatCategoryName(category)
      }))
    : [
        { value: 'shot_types', label: 'Shot Types' },
        { value: 'lighting', label: 'Lighting' },
        { value: 'color_grading', label: 'Color Grading' },
        { value: 'camera_movements', label: 'Camera Movements' },
        { value: 'emotional_tones', label: 'Emotional Tones' }
      ];

  // Convert selected categories to react-select value format
  const value = selectedCategories.map(category => ({
    value: category,
    label: formatCategoryName(category)
  }));

  /**
   * Handle selection change
   * @param {Object[]} selected - Selected options
   */
  const handleChange = (selected) => {
    onChange(selected ? selected.map(item => item.value) : []);
  };

  // Custom styles for react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? 'var(--primary-color)' : 'var(--border-color)',
      boxShadow: state.isFocused ? '0 0 0 1px var(--primary-color)' : provided.boxShadow,
      '&:hover': {
        borderColor: state.isFocused ? 'var(--primary-color)' : 'var(--primary-light)'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? 'var(--primary-color)' 
        : state.isFocused 
          ? 'var(--primary-light)' 
          : provided.backgroundColor,
      color: (state.isSelected || state.isFocused) ? 'var(--text-light)' : provided.color
    })
  };

  return (
    <div className="category-selector">
      <label id="category-select-label" htmlFor="category-select">Select Categories</label>
      <Select
        inputId="category-select"
        isMulti
        options={options}
        value={value}
        onChange={handleChange}
        placeholder="Select categories to include..."
        className="category-select"
        aria-labelledby="category-select-label"
        aria-describedby="category-select-help"
        styles={customStyles}
        closeMenuOnSelect={false}
      />
      <p id="category-select-help" className="form-help-text">
        Select the categories of cinematic elements you want to include in your enhanced prompt
      </p>
    </div>
  );
};

// Add default props
CategorySelector.defaultProps = {
  categories: [],
  selectedCategories: [],
  onChange: () => {}
};

export default CategorySelector;