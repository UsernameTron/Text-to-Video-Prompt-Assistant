import resourceLoader from './resourceLoader';
import stylePresets from './stylePresets';

/**
 * PromptEnhancer class for enhancing text prompts with cinematic elements
 */
export class PromptEnhancer {
  constructor() {
    this.resourceLoader = resourceLoader;
    this.enhancementError = null;
  }

  /**
   * Suggest modifiers for each selected category
   * @param {string} basicPrompt - The basic prompt
   * @param {string[]} categories - List of categories to include
   * @returns {Object} Object with suggested modifiers by category
   */
  suggestEnhancements(basicPrompt, categories = []) {
    try {
      // Reset any previous errors
      this.enhancementError = null;
      
      if (!this.resourceLoader.isLoaded) {
        throw new Error('Resources not loaded yet. Please wait or refresh the page.');
      }
      
      if (!categories || categories.length === 0) {
        // Default categories for a balanced cinematic prompt
        categories = [
          'shot_types',
          'camera_movements',
          'lighting',
          'emotional_tones',
          'time_of_day',
          'composition_rules'
        ];
      }

      const suggestions = {};
      for (const category of categories) {
        const options = this.resourceLoader.getCategoryOptions(category);
        if (options && options.length > 0) {
          suggestions[category] = options;
        }
      }

      return suggestions;
    } catch (error) {
      console.error('Error suggesting enhancements:', error);
      this.enhancementError = error.message;
      return {};
    }
  }

  /**
   * Format an enhanced prompt based on selected modifiers
   * @param {string} basicPrompt - The basic prompt
   * @param {Object} selectedModifiers - Object with selected modifiers by category
   * @returns {string} Enhanced prompt
   */
  formatEnhancedPrompt(basicPrompt, selectedModifiers) {
    try {
      // Reset any previous errors
      this.enhancementError = null;
      
      if (!selectedModifiers || Object.keys(selectedModifiers).length === 0) {
        return basicPrompt;
      }

      // Validate input
      if (!basicPrompt || typeof basicPrompt !== 'string') {
        throw new Error('Basic prompt must be a non-empty string');
      }
      
      // Start with the basic prompt
      let enhancedPrompt = basicPrompt.trim();

      // Define the order of categories for a coherent prompt structure
      const categoryOrder = [
        // Visual elements first
        'shot_types', 'camera_movements', 'composition_rules', 'framing',
        // Lighting and mood
        'lighting', 'color_grading', 'time_of_day', 'emotional_tones', 'environment',
        // Style references
        'art_movements', 'filmmakers', 'period_styles',
        // Technical aspects
        'resolution', 'frame_rate', 'aspect_ratios',
        // Audio elements
        'sound_design', 'music_styles',
        // Effects and transitions
        'vfx', 'transitions'
      ];

      // Add modifiers in the defined order
      const modifiers = [];
      for (const category of categoryOrder) {
        if (selectedModifiers[category]) {
          if (Array.isArray(selectedModifiers[category])) {
            modifiers.push(...selectedModifiers[category]);
          } else {
            modifiers.push(selectedModifiers[category]);
          }
        }
      }

      // Add any remaining modifiers not in the predefined order
      for (const category in selectedModifiers) {
        if (!categoryOrder.includes(category)) {
          if (Array.isArray(selectedModifiers[category])) {
            modifiers.push(...selectedModifiers[category]);
          } else {
            modifiers.push(selectedModifiers[category]);
          }
        }
      }

      // Add modifiers to the prompt
      if (modifiers.length > 0) {
        enhancedPrompt += ', ' + modifiers.join(', ');
      }

      return enhancedPrompt;
    } catch (error) {
      console.error('Error formatting enhanced prompt:', error);
      this.enhancementError = error.message;
      return basicPrompt;
    }
  }

  /**
   * Get any errors that occurred during enhancement
   * @returns {string|null} Error message or null if no error
   */
  getEnhancementError() {
    return this.enhancementError;
  }

  /**
   * Get an enhanced prompt based on a style preset
   * @param {string} basicPrompt - The basic prompt
   * @param {string} styleName - Name of the style preset
   * @returns {string} Enhanced prompt
   */
  getStyledPrompt(basicPrompt, styleName) {
    try {
      // Reset any previous errors
      this.enhancementError = null;
      
      if (!stylePresets[styleName]) {
        console.warn(`Style preset '${styleName}' not found, using default`);
        styleName = 'cinematic';
      }
      
      const style = stylePresets[styleName];
      return this.formatEnhancedPrompt(basicPrompt, style);
    } catch (error) {
      console.error('Error applying style preset:', error);
      this.enhancementError = error.message;
      return basicPrompt;
    }
  }

  /**
   * Get an enhanced prompt based on enhancement level
   * @param {string} basicPrompt - The basic prompt
   * @param {string} level - Enhancement level (minimal, balanced, comprehensive)
   * @returns {string} Enhanced prompt
   */
  getEnhancedPromptByLevel(basicPrompt, level = 'balanced') {
    try {
      // Reset any previous errors
      this.enhancementError = null;
      
      if (!this.resourceLoader.isLoaded) {
        throw new Error('Resources not loaded yet. Please wait or refresh the page.');
      }
      
      let categories;
      
      if (level === 'minimal') {
        categories = ['shot_types', 'lighting', 'color_grading'];
      } else if (level === 'comprehensive') {
        categories = [
          'shot_types', 'camera_movements', 'lighting', 'color_grading',
          'emotional_tones', 'time_of_day', 'composition_rules',
          'environment', 'sound_design', 'aspect_ratios', 'frame_rate'
        ];
      } else {
        // balanced (default)
        categories = [
          'shot_types', 'camera_movements', 'lighting', 'color_grading',
          'emotional_tones', 'time_of_day', 'composition_rules'
        ];
      }

      const modifiers = {};
      for (const category of categories) {
        const options = this.resourceLoader.getCategoryOptions(category);
        if (options && options.length > 0) {
          // Select a random option from each category
          modifiers[category] = options[Math.floor(Math.random() * options.length)];
        }
      }

      return this.formatEnhancedPrompt(basicPrompt, modifiers);
    } catch (error) {
      console.error('Error generating enhanced prompt by level:', error);
      this.enhancementError = error.message;
      return basicPrompt;
    }
  }
}

// Create a singleton instance
const promptEnhancer = new PromptEnhancer();
export default promptEnhancer;