import { PromptEnhancer } from './promptEnhancer';
import resourceLoader from './resourceLoader';

// Mock resourceLoader
jest.mock('./resourceLoader', () => ({
  loadAllResources: jest.fn().mockResolvedValue(true),
  getAllCategories: jest.fn().mockReturnValue(['shot_types', 'lighting', 'color_grading']),
  getCategoryOptions: jest.fn((category) => {
    const options = {
      shot_types: ['wide shot', 'close-up', 'medium shot'],
      lighting: ['natural lighting', 'low-key', 'high-key'],
      color_grading: ['technicolor', 'monochrome', 'sepia'],
      emotional_tones: ['mysterious', 'joyful', 'melancholic'],
      time_of_day: ['golden hour', 'night', 'dawn'],
      composition_rules: ['rule of thirds', 'symmetry', 'leading lines']
    };
    return options[category] || [];
  }),
  getExamples: jest.fn().mockReturnValue([
    { basic: 'A forest', enhanced: 'A forest, wide shot, natural lighting' }
  ]),
  isLoaded: true
}));

describe('PromptEnhancer', () => {
  let promptEnhancer;

  beforeEach(() => {
    promptEnhancer = new PromptEnhancer();
  });

  test('suggests enhancements for selected categories', () => {
    const basicPrompt = 'A city skyline';
    const categories = ['shot_types', 'lighting', 'color_grading'];
    
    const suggestions = promptEnhancer.suggestEnhancements(basicPrompt, categories);
    
    expect(suggestions).toHaveProperty('shot_types');
    expect(suggestions).toHaveProperty('lighting');
    expect(suggestions).toHaveProperty('color_grading');
    expect(suggestions.shot_types).toContain('wide shot');
    expect(suggestions.lighting).toContain('natural lighting');
    expect(suggestions.color_grading).toContain('technicolor');
  });

  test('uses default categories when none are provided', () => {
    const basicPrompt = 'A beach sunset';
    
    const suggestions = promptEnhancer.suggestEnhancements(basicPrompt);
    
    expect(Object.keys(suggestions).length).toBeGreaterThan(0);
    expect(resourceLoader.getCategoryOptions).toHaveBeenCalled();
  });

  test('formats enhanced prompt correctly', () => {
    const basicPrompt = 'A mountain landscape';
    const selectedModifiers = {
      shot_types: 'wide shot',
      lighting: 'natural lighting',
      time_of_day: 'golden hour',
      color_grading: 'vibrant'
    };
    
    const enhancedPrompt = promptEnhancer.formatEnhancedPrompt(basicPrompt, selectedModifiers);
    
    expect(enhancedPrompt).toContain(basicPrompt);
    expect(enhancedPrompt).toContain('wide shot');
    expect(enhancedPrompt).toContain('natural lighting');
    expect(enhancedPrompt).toContain('golden hour');
    expect(enhancedPrompt).toContain('vibrant');
  });

  test('returns original prompt when no modifiers are selected', () => {
    const basicPrompt = 'A person walking';
    
    const enhancedPrompt = promptEnhancer.formatEnhancedPrompt(basicPrompt, {});
    
    expect(enhancedPrompt).toBe(basicPrompt);
  });

  test('applies style preset to prompt', () => {
    const basicPrompt = 'A city street';
    const styleName = 'cinematic';
    
    const styledPrompt = promptEnhancer.getStyledPrompt(basicPrompt, styleName);
    
    expect(styledPrompt).toContain(basicPrompt);
    expect(styledPrompt).toContain('wide shot');
    expect(styledPrompt).toContain('dramatic lighting');
  });

  test('applies enhancement level to prompt', () => {
    const basicPrompt = 'A forest path';
    
    const minimalPrompt = promptEnhancer.getEnhancedPromptByLevel(basicPrompt, 'minimal');
    const balancedPrompt = promptEnhancer.getEnhancedPromptByLevel(basicPrompt, 'balanced');
    const comprehensivePrompt = promptEnhancer.getEnhancedPromptByLevel(basicPrompt, 'comprehensive');
    
    expect(minimalPrompt).toContain(basicPrompt);
    expect(balancedPrompt).toContain(basicPrompt);
    expect(comprehensivePrompt).toContain(basicPrompt);
    
    // The comprehensive prompt should have more modifiers
    const minimalCommas = (minimalPrompt.match(/,/g) || []).length;
    const balancedCommas = (balancedPrompt.match(/,/g) || []).length;
    const comprehensiveCommas = (comprehensivePrompt.match(/,/g) || []).length;
    
    expect(comprehensiveCommas).toBeGreaterThanOrEqual(balancedCommas);
    expect(balancedCommas).toBeGreaterThanOrEqual(minimalCommas);
  });
});