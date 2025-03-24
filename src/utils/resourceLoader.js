/**
 * ResourceLoader class for loading and managing cinematic resource data
 */
export class ResourceLoader {
  constructor() {
    this.resources = {};
    this.examples = [];
    this.isLoaded = false;
    this.loadError = null;
  }
  
  // Add these fallback category data in case resources fail to load
  fallbackResources = {
    film_effects: {
      shot_types: ['wide shot', 'close-up', 'medium shot', 'aerial shot', 'tracking shot', 'dolly zoom'],
      camera_movements: ['static', 'panning', 'tilting', 'tracking', 'dolly', 'crane', 'steady', 'handheld'],
      transitions: ['cut', 'fade', 'dissolve', 'wipe', 'iris', 'zoom']
    },
    cinematic_techniques: {
      composition_rules: ['rule of thirds', 'symmetry', 'leading lines', 'framing', 'depth'],
      lighting: ['natural lighting', 'low-key', 'high-key', 'Rembrandt', 'silhouette', 'dramatic'],
      color_grading: ['technicolor', 'monochrome', 'sepia', 'vibrant', 'desaturated', 'high contrast']
    },
    mood_descriptors: {
      emotional_tones: ['mysterious', 'joyful', 'melancholic', 'tense', 'peaceful', 'nostalgic'],
      time_of_day: ['golden hour', 'blue hour', 'night', 'dawn', 'midday', 'dusk']
    },
    tech_specs: {
      resolution: ['4K', '8K', 'HD', 'UHD'],
      frame_rate: ['24fps', '30fps', '60fps', '120fps'],
      aspect_ratios: ['16:9', '2.35:1', '1:1', '9:16', '4:3']
    }
  }

  /**
   * Load all resources from the public directory
   * @returns {Promise<boolean>} Whether the resources were loaded successfully
   */
  async loadAllResources() {
    if (this.isLoaded) {
      return true;
    }

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

      // First try loading from the server
      let loadedFromServer = false;
      try {
        const results = await Promise.allSettled(
          resourceFiles.map(async (file) => {
            const response = await fetch(`/resources/${file}.json`);
            if (!response.ok) {
              throw new Error(`HTTP error ${response.status}`);
            }
            return { file, data: await response.json() };
          })
        );
        
        // Process results
        results.forEach(result => {
          if (result.status === 'fulfilled') {
            this.resources[result.value.file] = result.value.data;
            loadedFromServer = true;
          }
        });
      } catch (error) {
        console.warn('Failed to load resources from server, using fallbacks');
      }

      // If server resources failed to load, use fallbacks
      if (!loadedFromServer || Object.keys(this.resources).length === 0) {
        this.resources = this.fallbackResources;
        console.log('Using fallback resources:', this.resources);
      }

      // Load or generate example prompts
      try {
        const examplesResponse = await fetch('/resources/examples/prompt_examples.json');
        if (examplesResponse.ok) {
          this.examples = await examplesResponse.json();
        } else {
          this.examples = [
            { 
              basic: 'A person walking through a forest', 
              enhanced: 'A person walking through a forest, wide shot, natural lighting, golden hour, 4K resolution, shallow depth of field, cinematic' 
            },
            {
              basic: 'City skyline at night',
              enhanced: 'City skyline at night, aerial shot, low-key lighting, blue color grading, rule of thirds composition, 24fps, cinematic'
            }
          ];
        }
      } catch (error) {
        this.examples = [
          { 
            basic: 'A person walking through a forest', 
            enhanced: 'A person walking through a forest, wide shot, natural lighting, golden hour, 4K resolution, shallow depth of field, cinematic' 
          },
          {
            basic: 'City skyline at night',
            enhanced: 'City skyline at night, aerial shot, low-key lighting, blue color grading, rule of thirds composition, 24fps, cinematic'
          }
        ];
      }

      this.isLoaded = true;
      return true;
    } catch (error) {
      console.error('Critical error loading resources:', error);
      // Create a user-friendly error message
      this.loadError = 'Failed to load cinematic resources. Using fallback data instead.';
      // Use fallbacks as last resort
      this.resources = this.fallbackResources;
      this.isLoaded = true;
      return true; // We return true because we have fallbacks
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
   * Get error message if resources failed to load
   * @returns {string|null} Error message or null if no error
   */
  getLoadError() {
    return this.loadError;
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