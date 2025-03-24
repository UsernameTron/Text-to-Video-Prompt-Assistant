/**
 * Predefined style presets for quick prompt enhancement
 * Each preset contains a set of modifiers for different categories
 */
const stylePresets = {
  /**
   * Cinematic style - Professional film look with wide shots and dramatic lighting
   */
  cinematic: {
    shot_types: 'wide shot',
    lighting: 'dramatic lighting',
    color_grading: 'high contrast',
    aspect_ratios: '2.35:1',
    frame_rate: '24fps'
  },
  
  /**
   * Documentary style - Natural, realistic look with handheld camera work
   */
  documentary: {
    shot_types: 'handheld',
    camera_movements: 'tracking',
    lighting: 'natural lighting',
    color_grading: 'neutral',
    sound_design: 'ambient noise'
  },
  
  /**
   * Music video style - Vibrant, dynamic style with creative transitions
   */
  music_video: {
    camera_movements: 'dynamic',
    color_grading: 'vibrant',
    lighting: 'high-key',
    vfx: 'lens flares',
    transitions: 'fast cuts'
  },
  
  /**
   * Film noir style - Classic black and white style with moody lighting
   */
  noir: {
    lighting: 'low-key',
    color_grading: 'monochrome',
    shot_types: 'Dutch angle',
    emotional_tones: 'mysterious',
    time_of_day: 'night'
  },
  
  /**
   * Nature documentary style - Beautiful landscape cinematography
   */
  nature: {
    shot_types: 'aerial shot',
    time_of_day: 'golden hour',
    camera_movements: 'smooth',
    environment: 'lush',
    sound_design: 'natural ambience'
  },
  
  /**
   * Sci-fi style - Futuristic look with cool color grading
   */
  scifi: {
    color_grading: 'cool',
    lighting: 'high contrast',
    camera_movements: 'steady',
    vfx: 'particle effects',
    sound_design: 'atmospheric'
  },
  
  /**
   * Horror style - Tense atmosphere with unsettling camera work
   */
  horror: {
    shot_types: 'Dutch angle',
    lighting: 'low-key',
    color_grading: 'desaturated',
    camera_movements: 'handheld',
    emotional_tones: 'tense'
  },
  
  /**
   * Fantasy style - Magical atmosphere with vibrant colors
   */
  fantasy: {
    color_grading: 'vibrant',
    lighting: 'magical',
    time_of_day: 'golden hour',
    camera_movements: 'sweeping',
    sound_design: 'orchestral'
  }
};

export default stylePresets;