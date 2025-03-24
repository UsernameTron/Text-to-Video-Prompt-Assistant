import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import PromptInput from '../components/PromptInput';
import CategorySelector from '../components/CategorySelector';
import ModifierSelector from '../components/ModifierSelector';
import EnhancedPrompt from '../components/EnhancedPrompt';
import StylePresets from '../components/StylePresets';
import resourceLoader from '../utils/resourceLoader';
import promptEnhancer from '../utils/promptEnhancer';

/**
 * Enhancer page component for enhancing prompts
 * 
 * @returns {React.ReactElement} The enhancer page
 */
const EnhancerPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const [basicPrompt, setBasicPrompt] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [suggestions, setSuggestions] = useState({});
  const [selectedModifiers, setSelectedModifiers] = useState({});
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [allCategories, setAllCategories] = useState([]);

  // Load resources on component mount
  useEffect(() => {
    const loadResources = async () => {
      try {
        setIsLoading(true);
        const loaded = await resourceLoader.loadAllResources();
        
        if (loaded) {
          setAllCategories(resourceLoader.getAllCategories());
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
  }, []);

  /**
   * Handle basic prompt submission
   * @param {string} prompt - User submitted prompt
   */
  const handlePromptSubmit = (prompt) => {
    setBasicPrompt(prompt);
    
    try {
      const newSuggestions = promptEnhancer.suggestEnhancements(prompt, selectedCategories);
      setSuggestions(newSuggestions);
      
      // Clear previous modifiers
      setSelectedModifiers({});
      
      // Generate a default enhanced prompt
      updateEnhancedPrompt(prompt, {});
      
      // Check for errors
      const enhancementError = promptEnhancer.getEnhancementError();
      if (enhancementError) {
        console.warn('Enhancement warning:', enhancementError);
      }
    } catch (error) {
      console.error('Error handling prompt submission:', error);
    }
  };

  /**
   * Handle category selection change
   * @param {string[]} categories - Selected categories
   */
  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
    
    if (basicPrompt) {
      try {
        const newSuggestions = promptEnhancer.suggestEnhancements(basicPrompt, categories);
        setSuggestions(newSuggestions);
        
        // Clear previous modifiers that are no longer in selected categories
        const updatedModifiers = {};
        for (const cat in selectedModifiers) {
          if (categories.includes(cat)) {
            updatedModifiers[cat] = selectedModifiers[cat];
          }
        }
        setSelectedModifiers(updatedModifiers);
        
        // Update enhanced prompt with the filtered modifiers
        updateEnhancedPrompt(basicPrompt, updatedModifiers);
      } catch (error) {
        console.error('Error handling category change:', error);
      }
    }
  };

  /**
   * Handle modifier selection change
   * @param {Object} modifiers - Selected modifiers by category
   */
  const handleModifiersChange = (modifiers) => {
    setSelectedModifiers(modifiers);
    updateEnhancedPrompt(basicPrompt, modifiers);
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
   * Update the enhanced prompt based on basic prompt and modifiers
   * @param {string} prompt - Basic prompt
   * @param {Object} modifiers - Selected modifiers
   */
  const updateEnhancedPrompt = (prompt, modifiers) => {
    try {
      const newEnhancedPrompt = promptEnhancer.formatEnhancedPrompt(prompt, modifiers);
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
                
                <CategorySelector 
                  categories={allCategories} 
                  selectedCategories={selectedCategories} 
                  onChange={handleCategoryChange} 
                />
              </section>
              
              <div className="enhancer-grid">
                <section className="enhancer-input" aria-labelledby="modifiers-section-heading">
                  <h2 id="modifiers-section-heading">Select Modifiers</h2>
                  <ModifierSelector 
                    suggestions={suggestions} 
                    onModifiersChange={handleModifiersChange} 
                  />
                </section>
                
                <section className="enhancer-output" aria-labelledby="output-section-heading">
                  <h2 id="output-section-heading">Enhanced Output</h2>
                  <EnhancedPrompt enhancedPrompt={enhancedPrompt} />
                </section>
              </div>
              
              <section className="style-section" aria-labelledby="styles-section-heading">
                <h2 id="styles-section-heading">Style Presets</h2>
                <p>Apply a cinematic style preset to quickly enhance your prompt</p>
                <StylePresets onSelectStyle={handleStyleSelect} />
              </section>
            </>
          )}
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>
            Text-to-Video Prompt Optimizer - A tool for enhancing text-to-video generation prompts
            with cinematic elements.
          </p>
          <p>
            &copy; {new Date().getFullYear()} - Text-to-Video Prompt Optimizer
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EnhancerPage;