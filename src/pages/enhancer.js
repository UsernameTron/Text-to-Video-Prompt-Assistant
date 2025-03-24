import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import PromptInput from '../components/PromptInput';
import EnhancedPrompt from '../components/EnhancedPrompt';
import StylePresets from '../components/StylePresets';
import FilmEffectsSelector from '../components/FilmEffectsSelector';
import resourceLoader from '../utils/resourceLoader';
import promptEnhancer from '../utils/promptEnhancer';
import { generateEnhancedPrompt } from '../utils/filmEffects';

/**
 * Enhancer page component for enhancing prompts
 * 
 * @returns {React.ReactElement} The enhancer page
 */
const EnhancerPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const [basicPrompt, setBasicPrompt] = useState('');
  const [selectedEffects, setSelectedEffects] = useState([]);
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [allCategories, setAllCategories] = useState([]);

  // Load resources on component mount
  useEffect(() => {
    const loadResources = async () => {
      try {
        setIsLoading(true);
        const loaded = await resourceLoader.loadAllResources();
        
        if (loaded) {
          const categories = resourceLoader.getAllCategories();
          setAllCategories(categories);
          
          // Ensure categories are set even if resourceLoader.getAllCategories() returns empty
          if (!categories.length) {
            setAllCategories(['shot_types', 'camera_movements', 'lighting', 
                              'color_grading', 'emotional_tones', 'time_of_day']);
          }
        } else {
          const error = resourceLoader.getLoadError() || 'Failed to load resources';
          setLoadingError(error);
        }
      } catch (error) {
        console.error('Error in resource loading:', error);
        setLoadingError('An unexpected error occurred. Please try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();
    
    // Add a timeout to ensure UI updates even if there's a delay
    const timeoutId = setTimeout(() => {
      if (!resourceLoader.isLoaded) {
        console.log('Forcing resource loader to use fallbacks after timeout');
        resourceLoader.resources = {
          film_effects: {
            shot_types: ['wide shot', 'close-up', 'medium shot', 'aerial shot'],
            camera_movements: ['static', 'panning', 'tracking', 'dolly']
          },
          cinematic_techniques: {
            lighting: ['natural lighting', 'low-key', 'high-key', 'dramatic'],
            color_grading: ['technicolor', 'monochrome', 'vibrant', 'cool']
          },
          mood_descriptors: {
            emotional_tones: ['mysterious', 'joyful', 'melancholic', 'tense'],
            time_of_day: ['golden hour', 'night', 'dawn', 'dusk']
          }
        };
        resourceLoader.isLoaded = true;
        setAllCategories(['shot_types', 'camera_movements', 'lighting', 
                          'color_grading', 'emotional_tones', 'time_of_day']);
        setIsLoading(false);
      }
    }, 3000); // 3 second timeout

    // Clean up the timeout when component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  /**
   * Handle basic prompt submission
   * @param {string} prompt - User submitted prompt
   */
  const handlePromptSubmit = (prompt) => {
    setBasicPrompt(prompt);
    
    try {
      // Update the enhanced prompt with current effects
      updateEnhancedPrompt(prompt, selectedEffects);
    } catch (error) {
      console.error('Error handling prompt submission:', error);
    }
  };

  /**
   * Handle effect selection change
   * @param {string[]} effects - Selected effect IDs
   */
  const handleEffectsChange = (effects) => {
    setSelectedEffects(effects);
    updateEnhancedPrompt(basicPrompt, effects);
  };

  /**
   * Handle style preset selection
   * @param {string} styleName - Name of the style preset
   */
  const handleStyleSelect = (styleName) => {
    try {
      const styledPrompt = promptEnhancer.getStyledPrompt(basicPrompt, styleName);
      setEnhancedPrompt(styledPrompt);
    } catch (error) {
      console.error('Error applying style preset:', error);
    }
  };

  /**
   * Update the enhanced prompt based on basic prompt and selected effects
   * @param {string} prompt - Basic prompt
   * @param {string[]} effects - Selected effects
   */
  const updateEnhancedPrompt = (prompt, effects) => {
    try {
      if (!prompt) {
        return;
      }
      
      const newEnhancedPrompt = generateEnhancedPrompt(prompt, effects);
      setEnhancedPrompt(newEnhancedPrompt);
    } catch (error) {
      console.error('Error updating enhanced prompt:', error);
    }
  };

  return (
    <div className="page">
      <Head>
        <title>Prompt Enhancer | Text-to-Video Prompt Optimizer</title>
        <meta name="description" content="Enhance your text-to-video prompts with cinematic elements" />
      </Head>
      
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      <Header />
      
      <main id="main-content">
        <div className="container">
          <h1>Prompt Enhancer</h1>
          
          {isLoading ? (
            <div className="loading" aria-live="polite">
              <p>Loading cinematic resources...</p>
            </div>
          ) : loadingError ? (
            <div className="error-message" role="alert">
              <h2>Error Loading Resources</h2>
              <p>{loadingError}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-primary"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              <section className="enhancer-section" aria-labelledby="input-section-heading">
                <h2 id="input-section-heading">Basic Prompt</h2>
                <PromptInput 
                  onSubmit={handlePromptSubmit} 
                  initialValue={basicPrompt} 
                />
              </section>
              
              <div className="enhancer-grid">
                <section className="enhancer-input" aria-labelledby="film-effects-section-heading">
                  <h2 id="film-effects-section-heading">Film Effects</h2>
                  <FilmEffectsSelector 
                    selectedEffects={selectedEffects}
                    onEffectChange={handleEffectsChange}
                  />
                  
                  <div className="style-section" aria-labelledby="styles-section-heading">
                    <h3 id="styles-section-heading">Style Presets</h3>
                    <p>Apply a cinematic style preset to quickly enhance your prompt</p>
                    <StylePresets onSelectStyle={handleStyleSelect} />
                  </div>
                </section>
                
                <section className="enhancer-output" aria-labelledby="output-section-heading">
                  <h2 id="output-section-heading">Enhanced Output</h2>
                  <EnhancedPrompt enhancedPrompt={enhancedPrompt} />
                </section>
              </div>
            </>
          )}
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} - Text-to-Video Prompt Optimizer
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EnhancerPage;