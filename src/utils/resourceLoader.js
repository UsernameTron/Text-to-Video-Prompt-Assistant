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

  /**
   * Load all resources from the public directory
   * @returns {Promise<boolean>} Whether the resources were loaded successfully
   */
  async loadAllResources() {
    if (this.isLoaded) return true;

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

      const failedFiles = [];
      
      // Load resource files in parallel for better performance
      const results = await Promise.allSettled(
        resourceFiles.map(async (file) => {
          try {
            const response = await fetch(`/resources/${file}.json`);
            if (!response.ok) {
              throw new Error(`HTTP error ${response.status}`);
            }
            return { file, data: await response.json() };
          } catch (error) {
            failedFiles.push(file);
            console.warn(`Failed to load ${file}.json:`, error.message);
            return { file, data: {} };
          }
        })
      );
      
      // Process results
      results.forEach(result => {
        if (result.status === 'fulfilled') {
          this.resources[result.value.file] = result.value.data;
        }
      });

      // Load example prompts
      try {
        const examplesResponse = await fetch('/resources/examples/prompt_examples.json');
        if (examplesResponse.ok) {
          this.examples = await examplesResponse.json();
        } else {
          console.warn(`Failed to load examples: HTTP error ${examplesResponse.status}`);
          // Provide fallback examples if the file fails to load
          this.examples = [
            { 
              basic: "A person walking through a forest", 
              enhanced: "A person walking through a forest, wide shot, natural lighting, golden hour, 4K resolution, shallow depth of field, cinematic" 
            },
            {
              basic: "City skyline at night",
              enhanced: "City skyline at night, aerial shot, low-key lighting, blue color grading, rule of thirds composition, 24fps, cinematic"
            }
          ];
        }
      } catch (error) {
        console.error('Error loading examples:', error.message);
        // Provide fallback examples if loading fails
        this.examples = [
          { 
            basic: "A person walking through a forest", 
            enhanced: "A person walking through a forest, wide shot, natural lighting, golden hour, 4K resolution, shallow depth of field, cinematic" 
          },
          {
            basic: "City skyline at night",
            enhanced: "City skyline at night, aerial shot, low-key lighting, blue color grading, rule of thirds composition, 24fps, cinematic"
          }
        ];
      }

      this.isLoaded = true;
      
      // If some resources failed to load but we have fallbacks, consider it a partial success
      if (failedFiles.length > 0) {
        console.warn(`Some resources failed to load: ${failedFiles.join(', ')}. Using fallbacks.`);
        return true;
      }
      
      return true;
    } catch (error) {
      console.error('Critical error loading resources:', error);
      // Create a user-friendly error message
      this.loadError = 'Failed to load cinematic resources. Please refresh the page or try again later.';
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