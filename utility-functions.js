// src/utils/resourceLoader.js

/**
 * ResourceLoader class for loading and managing cinematic resource data
 */
export class ResourceLoader {
  constructor() {
    this.resources = {};
    this.examples = [];
    this.isLoaded = false;
  }

  /**
   * Load all resources from the public directory
   */
  async loadAllResources() {
    if (this.isLoaded) return;

    try {
      // Load resource files
      const resourceFiles = [
        'film_effects',
        'cinematic_techniques',
        'mood_descriptors',
        'visual_styles',
        'tech_specs',
        'audio_cues',
        'post_prod_effects'
      ];

      for (const file of resourceFiles) {
        const response = await fetch(`/resources/${file}.json`);
        if (response.ok) {
          this.resources[file] = await response.json();
        } else {
          console.warn(`Failed to load ${file}.json`);
          this.resources[file] = {};
        }
      }

      // Load example prompts
      const examplesResponse = await fetch('/resources/examples/prompt_examples.json');
      if (examplesResponse.ok) {
        this.examples = await examplesResponse.json();
      }

      this.isLoaded = true;
      return true;
    } catch (error) {
      console.error('Error loading resources:', error);
      return false;
    }
  }

  /**
   * Get all available categories
   * @returns {string[]} List of all categories
   */
  getAllCategories() {
    if (!this.isLoaded) {
      console.warn('Resources not loaded yet');
      return [];
    }

    const categories = [];
    for (const resourceName in this.resources) {
      if (Object.prototype.hasOwnProperty.call(this.resources, resourceName)) {
        const resource = this.resources[resourceName];
        categories.push(...Object.keys(resource));
      }
    }

    return [...new Set(categories)]; // Remove duplicates
  }

  /**
   * Get all options for a specific category
   * @param {string} category - Category name
   * @returns {string[]} List of options
   */
  getCategoryOptions(category) {
    if (!this.isLoaded) {
      console.warn('Resources not loaded yet');
      return [];
    }

    for (const resourceName in this.resources) {
      if (Object.prototype.hasOwnProperty.call(this.resources, resourceName)) {
        const resource = this.resources[resourceName];
        if (Object.prototype.hasOwnProperty.call(resource, category)) {
          return resource[category];
        }
      }
    }

    return [];
  }

  /**
   * Get example prompts
   * @returns {Array} List of example prompts
   */
  getExamples() {
    return this.examples;
  }

  /**
   * Get random options from various categories
   * @param {number} count - Number of options to get per category
   * @returns {Object} Object with categories and selected options
   */
  getRandomOptions(count = 1) {
    if (!this.isLoaded) {
      console.warn('Resources not loaded yet');
      return {};
    }

    const result = {};
    const categories = this.getAllCategories();

    for (const category of categories) {
      const options = this.getCategoryOptions(category);
      if (options.length > 0) {
        const randomIndices = [];
        for (let i = 0; i < Math.min(count, options.length); i++) {
          let index;
          do {
            index = Math.floor(Math.random() * options.length);
          } while (randomIndices.includes(index));
          randomIndices.push(index);
        }
        result[category] = randomIndices.map(i => options[i]);
      }
    }

    return result;
  }
}

// Create a singleton instance
const resourceLoader = new ResourceLoader();
export default resourceLoader;

// src/utils/promptEnhancer.js

import resourceLoader from './resourceLoader';
import stylePresets from './stylePresets';

/**
 * PromptEnhancer class for enhancing text prompts with cinematic elements
 */
export class PromptEnhancer {
  constructor() {
    this.resourceLoader = resourceLoader;
  }

  /**
   * Suggest modifiers for each selected category
   * @param {string} basicPrompt - The basic prompt
   * @param {string[]} categories - List of categories to include
   * @returns {Object} Object with suggested modifiers by category
   */
  suggestEnhancements(basicPrompt, categories = []) {
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
  }

  /**
   * Format an enhanced prompt based on selected modifiers
   * @param {string} basicPrompt - The basic prompt
   * @param {Object} selectedModifiers - Object with selected modifiers by category
   * @returns {string} Enhanced prompt
   */
  formatEnhancedPrompt(basicPrompt, selectedModifiers) {
    if (!selectedModifiers || Object.keys(selectedModifiers).length === 0) {
      return basicPrompt;
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
  }

  /**
   * Get an enhanced prompt based on a style preset
   * @param {string} basicPrompt - The basic prompt
   * @param {string} styleName - Name of the style preset
   * @returns {string} Enhanced prompt
   */
  getStyledPrompt(basicPrompt, styleName) {
    const style = stylePresets[styleName] || stylePresets.cinematic;
    return this.formatEnhancedPrompt(basicPrompt, style);
  }

  /**
   * Get an enhanced prompt based on enhancement level
   * @param {string} basicPrompt - The basic prompt
   * @param {string} level - Enhancement level (minimal, balanced, comprehensive)
   * @returns {string} Enhanced prompt
   */
  getEnhancedPromptByLevel(basicPrompt, level = 'balanced') {
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
  }
}

// Create a singleton instance
const promptEnhancer = new PromptEnhancer();
export default promptEnhancer;

// src/utils/stylePresets.js

/**
 * Predefined style presets for quick prompt enhancement
 */
const stylePresets = {
  cinematic: {
    shot_types: 'wide shot',
    lighting: 'dramatic lighting',
    color_grading: 'high contrast',
    aspect_ratios: '2.35:1',
    frame_rate: '24fps'
  },
  
  documentary: {
    shot_types: 'handheld',
    camera_movements: 'tracking',
    lighting: 'natural lighting',
    color_grading: 'neutral',
    sound_design: 'ambient noise'
  },
  
  music_video: {
    camera_movements: 'dynamic',
    color_grading: 'vibrant',
    lighting: 'high-key',
    vfx: 'lens flares',
    transitions: 'fast cuts'
  },
  
  noir: {
    lighting: 'low-key',
    color_grading: 'monochrome',
    shot_types: 'Dutch angle',
    emotional_tones: 'mysterious',
    time_of_day: 'night'
  },
  
  nature: {
    shot_types: 'aerial shot',
    time_of_day: 'golden hour',
    camera_movements: 'smooth',
    environment: 'lush',
    sound_design: 'natural ambience'
  },
  
  scifi: {
    color_grading: 'cool',
    lighting: 'high contrast',
    camera_movements: 'steady',
    vfx: 'particle effects',
    sound_design: 'atmospheric'
  },
  
  horror: {
    shot_types: 'Dutch angle',
    lighting: 'low-key',
    color_grading: 'desaturated',
    camera_movements: 'handheld',
    emotional_tones: 'tense'
  },
  
  fantasy: {
    color_grading: 'vibrant',
    lighting: 'magical',
    time_of_day: 'golden hour',
    camera_movements: 'sweeping',
    sound_design: 'orchestral'
  }
};

export default stylePresets;
