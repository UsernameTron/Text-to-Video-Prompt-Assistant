// Film Effects System Implementation

export const FILM_EFFECTS_CATEGORIES = {
  SHOT_TYPE: 'Shot Type',
  CAMERA_MOVEMENT: 'Camera Movement',
  CAMERA_ANGLE: 'Camera Angle',
  LENS_EFFECTS: 'Lens Effects',
  LIGHTING: 'Lighting',
  FILM_STOCK: 'Film Stock',
  ERA_STYLE: 'Era Style',
  COLOR_GRADING: 'Color Grading',
  ATMOSPHERE: 'Atmosphere & Weather',
  MOOD: 'Mood & Atmosphere',
  GENRE_STYLE: 'Genre Style',
  SPECIAL_EFFECTS: 'Special Effects',
  VISUAL_EFFECTS: 'Visual Effects'
};

export const FILM_EFFECTS_LIBRARY = {
  [FILM_EFFECTS_CATEGORIES.SHOT_TYPE]: [
    { id: 'close-up', name: 'Close-up', description: 'Shows just a person\'s face or a detail' },
    { id: 'extreme-close-up', name: 'Extreme close-up', description: 'Shows very small details like eyes or small objects' },
    { id: 'medium-shot', name: 'Medium shot', description: 'Shows subject from waist up, good for dialogue' },
    { id: 'wide-shot', name: 'Wide shot', description: 'Shows the entire location to establish where action takes place' },
    { id: 'over-the-shoulder', name: 'Over-the-shoulder', description: 'Camera positioned behind one person looking at another' },
    { id: 'pov', name: 'POV (point of view)', description: 'Camera shows exactly what the character would see' },
    { id: 'low-angle', name: 'Low angle shot', description: 'Camera looks up at the subject, making them appear powerful' },
    { id: 'high-angle', name: 'High angle shot', description: 'Camera looks down at the subject, making them appear smaller' },
    { id: 'dutch-angle', name: 'Dutch angle', description: 'Camera is tilted sideways, creating tension or disorientation' },
    { id: 'birds-eye', name: 'Bird\'s eye view', description: 'Camera looks straight down from above' },
    { id: 'worms-eye', name: 'Worm\'s eye view', description: 'Camera looks straight up from below' },
    { id: 'two-shot', name: 'Two-shot', description: 'Framing two subjects together' }
  ],
  
  [FILM_EFFECTS_CATEGORIES.CAMERA_MOVEMENT]: [
    { id: 'dolly-shot', name: 'Dolly shot', description: 'Camera smoothly moves toward or away from the subject' },
    { id: 'tracking-shot', name: 'Tracking shot', description: 'Camera smoothly follows alongside the subject\'s movement' },
    { id: 'crane-shot', name: 'Crane shot', description: 'Camera smoothly lifts up high or swoops down from above' },
    { id: 'steadicam-shot', name: 'Steadicam shot', description: 'Smooth, floating camera movement that follows action' },
    { id: 'handheld-shot', name: 'Handheld shot', description: 'Slightly shaky camera movement giving a realistic feel' },
    { id: 'panning-shot', name: 'Panning shot', description: 'Camera pivots horizontally (left to right or right to left)' },
    { id: 'tilting-shot', name: 'Tilting shot', description: 'Camera pivots vertically (up to down or down to up)' },
    { id: 'zoom-shot', name: 'Zoom shot', description: 'Camera lens zooms in or out, making subject appear closer or farther' },
    { id: 'drone-shot', name: 'Drone shot', description: 'Camera moves with bird\'s-eye view from high above' },
    { id: 'whip-pan', name: 'Whip pan', description: 'Very fast sideways camera movement creating a blurry transition' },
    { id: 'push-in', name: 'Push in', description: 'Camera slowly moves closer to subject, often to highlight emotion' },
    { id: 'pull-out', name: 'Pull out', description: 'Camera slowly moves away from subject, to reveal more context' }
  ],
  
  [FILM_EFFECTS_CATEGORIES.CAMERA_ANGLE]: [
    { id: 'eye-level', name: 'Eye level', description: 'Neutral camera angle at human eye level' },
    { id: 'low-angle-shot', name: 'Low angle shot', description: 'Camera looks up at the subject, making them appear powerful' },
    { id: 'high-angle-shot', name: 'High angle shot', description: 'Camera looks down at the subject, making them appear smaller' },
    { id: 'dutch-angle-shot', name: 'Dutch angle', description: 'Camera is tilted sideways, creating tension or disorientation' },
    { id: 'birds-eye-view', name: 'Bird\'s eye view', description: 'Camera looks straight down from above' },
    { id: 'worms-eye-view', name: 'Worm\'s eye view', description: 'Camera looks straight up from below' },
    { id: 'over-the-shoulder-shot', name: 'Over-the-shoulder', description: 'Camera positioned behind one person looking at another' },
    { id: 'canted-angle', name: 'Canted angle', description: 'Camera deliberately tilted to create unease or disorientation' }
  ],
  
  [FILM_EFFECTS_CATEGORIES.LENS_EFFECTS]: [
    { id: 'wide-angle-lens', name: 'Wide-angle lens', description: 'Shows a broader view with slight distortion at edges' },
    { id: 'telephoto-lens', name: 'Telephoto lens', description: 'Zoomed in, with background appearing closer to subject' },
    { id: 'fisheye-lens', name: 'Fisheye lens', description: 'Extreme rounded distortion showing a super-wide view' },
    { id: 'macro-lens', name: 'Macro lens', description: 'Extreme close-up view of tiny details' },
    { id: 'anamorphic-lens', name: 'Anamorphic lens', description: 'Widescreen format with distinctive horizontal lens flares' },
    { id: 'shallow-depth-of-field', name: 'Shallow depth of field', description: 'Subject in focus while background is blurry' },
    { id: 'deep-focus', name: 'Deep focus', description: 'Everything from near to far is in sharp focus' },
    { id: 'lens-flare', name: 'Lens flare', description: 'Streak or circle of light when camera points toward bright light' },
    { id: 'bokeh', name: 'Bokeh', description: 'Pleasing blurry background with soft-edged circles from lights' },
    { id: 'vignetting', name: 'Vignetting', description: 'Image darker around the edges, drawing attention to center' }
  ],
  
  [FILM_EFFECTS_CATEGORIES.LIGHTING]: [
    { id: 'low-key-lighting', name: 'Low-key lighting', description: 'Dark scene with strong shadows and small areas of light, creating mystery' },
    { id: 'high-key-lighting', name: 'High-key lighting', description: 'Bright, evenly lit scene with few shadows, looking clean and open' },
    { id: 'rembrandt-lighting', name: 'Rembrandt lighting', description: 'Elegant portrait lighting with a triangle of light on one cheek' },
    { id: 'backlighting', name: 'Backlighting', description: 'Subject outlined with light from behind, creating a glowing edge' },
    { id: 'silhouette-lighting', name: 'Silhouette lighting', description: 'Subject appears as a dark shape against a bright background' },
    { id: 'practical-lighting', name: 'Practical lighting', description: 'Scene lit only by lights visible in the shot (lamps, candles, etc.)' },
    { id: 'harsh-directional-light', name: 'Harsh directional light', description: 'Strong light creating defined shadows, like direct sunlight' },
    { id: 'soft-diffused-light', name: 'Soft diffused light', description: 'Gentle, even lighting with soft shadows, like on an overcast day' },
    { id: 'golden-hour', name: 'Golden hour', description: 'Warm, golden sunlight like shortly before sunset, making everything look magical' },
    { id: 'blue-hour', name: 'Blue hour', description: 'Soft blue light just after sunset or before sunrise' },
    { id: 'foggy-diffusion', name: 'Foggy diffusion', description: 'Light scattered through fog, creating a soft, mysterious glow' },
    { id: 'dappled-light', name: 'Dappled light', description: 'Spots of light and shadow, like sunshine through leaves' },
    { id: 'neon-lighting', name: 'Neon lighting', description: 'Bright, colorful artificial light with a strong glow, like city signs at night' },
    { id: 'firelight', name: 'Firelight', description: 'Warm, orange flickering light like from a campfire or fireplace' },
    { id: 'candlelight', name: 'Candlelight', description: 'Soft, warm, slightly flickering light creating an intimate mood' },
    { id: 'moonlight', name: 'Moonlight', description: 'Soft blue-silver light creating a night-time look' }
  ],
  
  [FILM_EFFECTS_CATEGORIES.FILM_STOCK]: [
    { id: '16mm-film', name: '16mm film with visible grain', description: 'Old-fashioned grainy film look, like home movies from the 1960s-70s' },
    { id: '8mm-vintage', name: '8mm vintage film with heavy grain', description: 'Very grainy, shaky old movie look, like family videos from the 1950s-60s' },
    { id: '35mm-kodachrome', name: '35mm Kodachrome with saturated colors', description: 'Rich, vibrant colors with a warm, nostalgic feel, like old National Geographic photos' },
    { id: '70mm-imax', name: '70mm IMAX-style clarity', description: 'Ultra-high quality, extremely sharp and detailed like modern blockbuster movies' },
    { id: 'super-8', name: 'Super 8 with scratches and jitter', description: 'Scratchy, vintage home movie look with slight jumps in the image' },
    { id: 'black-and-white', name: 'Black and white film with high contrast', description: 'Classic no-color look with strong shadows and highlights' },
    { id: 'polaroid-style', name: 'Polaroid-style with vignetting', description: 'Slightly blurry, with a square frame and slightly off colors, like an instant photo' },
    { id: 'technicolor', name: 'Technicolor with exaggerated colors', description: 'Extra vibrant, almost unrealistically colorful like classic \'Wizard of Oz\' or Disney films' }
  ],
  
  [FILM_EFFECTS_CATEGORIES.ERA_STYLE]: [
    { id: '1920s-silent-film', name: '1920s silent film', description: 'Flickering black and white image, slightly sped up movements' },
    { id: '1940s-film-noir', name: '1940s film noir', description: 'High contrast black and white with dramatic shadows' },
    { id: '1950s-eastmancolor', name: '1950s Eastmancolor', description: 'Slightly faded, pastel-like colors common in 1950s movies' },
    { id: '1970s-grindhouse', name: '1970s grindhouse', description: 'Scratchy, damaged-looking film with sudden color changes' },
    { id: '1980s-vhs', name: '1980s VHS', description: 'Slightly blurry with occasional lines or tracking problems' },
    { id: '1990s-music-video', name: '1990s music video', description: 'Quick cuts, slightly oversaturated colors like MTV videos' },
    { id: '2000s-digital', name: '2000s digital video', description: 'Clean but slightly \'video-like\' quality, not quite film-like' },
    { id: 'modern-digital-cinema', name: 'Modern digital cinema', description: 'Crisp, clean, perfect-looking image like today\'s movies' }
  ],
  
  [FILM_EFFECTS_CATEGORIES.COLOR_GRADING]: [
    { id: 'teal-and-orange', name: 'Teal and orange', description: 'Popular movie look with blue-green shadows and orange-tan skin tones' },
    { id: 'monochromatic', name: 'Monochromatic', description: 'Everything in shades of a single color' },
    { id: 'sepia-tone', name: 'Sepia tone', description: 'Brownish-yellow vintage photo look' },
    { id: 'day-for-night', name: 'Day for night', description: 'Bluish tint making daytime footage look like night' },
    { id: 'halation-glow', name: 'Halation glow', description: 'Soft glow around bright objects or light sources' },
    { id: 'film-grain', name: 'Film grain', description: 'Slight textured noise like in traditional film' },
    { id: 'light-leaks', name: 'Light leaks', description: 'Streaks of colored light bleeding into the image' }
  ],
  
  [FILM_EFFECTS_CATEGORIES.ATMOSPHERE]: [
    { id: 'fog', name: 'Fog', description: 'Thick misty air reducing visibility, creating mystery' },
    { id: 'mist', name: 'Mist', description: 'Light fog adding atmosphere without heavily obscuring view' },
    { id: 'rain', name: 'Rain', description: 'Wet surfaces, droplets, and overall dampness' },
    { id: 'snow', name: 'Snow', description: 'White covering, cold look, and unique reflective light' },
    { id: 'dust-particles', name: 'Dust particles', description: 'Visible floating dust catching light beams' },
    { id: 'smoke', name: 'Smoke', description: 'Visible smoke adding density to the air and diffusing light' },
    { id: 'heat-distortion', name: 'Heat distortion', description: 'Wavering visual effect like over hot pavement' }
  ],
  
  [FILM_EFFECTS_CATEGORIES.MOOD]: [
    { id: 'somber-atmosphere', name: 'Somber atmosphere', description: 'Sad, serious mood with muted colors' },
    { id: 'joyful-atmosphere', name: 'Joyful atmosphere', description: 'Happy, upbeat mood with bright, vibrant colors' },
    { id: 'tense-atmosphere', name: 'Tense atmosphere', description: 'Anxiety-inducing mood with high contrast and harsh lighting' },
    { id: 'melancholic-atmosphere', name: 'Melancholic atmosphere', description: 'Gentle sadness with soft blues and muted tones' },
    { id: 'romantic-atmosphere', name: 'Romantic atmosphere', description: 'Intimate, warm lighting with soft focus' },
    { id: 'eerie-atmosphere', name: 'Eerie atmosphere', description: 'Unsettling, strange mood with unusual colors and shadows' },
    { id: 'nostalgic-atmosphere', name: 'Nostalgic atmosphere', description: 'Wistful, memory-like quality with vintage filter and warmth' }
  ],
  
  [FILM_EFFECTS_CATEGORIES.GENRE_STYLE]: [
    { id: 'horror-style', name: 'Horror style', description: 'Dark shadows, unsettling angles, and high contrast' },
    { id: 'sci-fi-style', name: 'Sci-fi style', description: 'Clean, technical look with blue tones and defined highlights' },
    { id: 'western-style', name: 'Western style', description: 'Dusty, warm colors with expansive landscapes' },
    { id: 'noir-style', name: 'Noir style', description: 'High contrast black and white with dramatic shadows' },
    { id: 'fantasy-style', name: 'Fantasy style', description: 'Enhanced colors and magical atmospheric effects' },
    { id: 'documentary-style', name: 'Documentary style', description: 'Natural lighting with realistic, observational framing' }
  ],
  
  [FILM_EFFECTS_CATEGORIES.SPECIAL_EFFECTS]: [
    { id: 'slow-motion', name: 'Slow motion', description: 'Action shown much slower than normal, revealing details' },
    { id: 'timelapse', name: 'Timelapse', description: 'Very sped up footage showing change over time' },
    { id: 'double-exposure', name: 'Double exposure', description: 'Two images overlaid on top of each other' },
    { id: 'split-screen', name: 'Split screen', description: 'Screen divided to show multiple scenes at once' }
  ]
};

// Style presets for quick application
export const STYLE_PRESETS = {
  'cinematic': {
    name: 'Cinematic',
    description: 'Professional movie-like quality',
    effects: [
      'tracking-shot',
      'shallow-depth-of-field',
      '35mm-kodachrome',
      'low-key-lighting'
    ]
  },
  'vintage': {
    name: 'Vintage',
    description: 'Old film look from the past',
    effects: [
      '16mm-film',
      'film-grain',
      'vignetting',
      'sepia-tone'
    ]
  },
  'documentary': {
    name: 'Documentary',
    description: 'Realistic, observational style',
    effects: [
      'documentary-style',
      'handheld-shot',
      'natural-lighting',
      'deep-focus'
    ]
  },
  'noir': {
    name: 'Film Noir',
    description: 'High contrast, dramatic shadows',
    effects: [
      '1940s-film-noir',
      'low-key-lighting',
      'dutch-angle',
      'high-contrast'
    ]
  },
  'music-video': {
    name: 'Music Video',
    description: 'Vibrant, stylized visuals',
    effects: [
      'whip-pan',
      '1990s-music-video',
      'saturated-colors',
      'lens-flare'
    ]
  },
  'horror': {
    name: 'Horror',
    description: 'Unsettling, dark and tense',
    effects: [
      'horror-style',
      'low-key-lighting',
      'dutch-angle',
      'eerie-atmosphere'
    ]
  },
  'dreamy': {
    name: 'Dreamy',
    description: 'Soft, ethereal and magical',
    effects: [
      'soft-diffused-light',
      'shallow-depth-of-field',
      'halation-glow',
      'foggy-diffusion'
    ]
  }
};

/**
 * Get effects from a style preset
 * @param {string} presetId - ID of the preset
 * @returns {string[]} Array of effect IDs
 */
export function getEffectsFromPreset(presetId) {
  if (!STYLE_PRESETS[presetId]) {
    return [];
  }
  return STYLE_PRESETS[presetId].effects;
}

/**
 * Get a list of all categories
 * @returns {string[]} Array of category names
 */
export function getAllCategories() {
  return Object.values(FILM_EFFECTS_CATEGORIES);
}

/**
 * Get a list of all effects
 * @returns {Object[]} Array of effect objects
 */
export function getAllEffects() {
  const allEffects = [];
  
  Object.keys(FILM_EFFECTS_LIBRARY).forEach(category => {
    FILM_EFFECTS_LIBRARY[category].forEach(effect => {
      allEffects.push({
        ...effect,
        category
      });
    });
  });
  
  return allEffects;
}

/**
 * Get effects by category
 * @param {string} category - Category name
 * @returns {Object[]} Array of effect objects for the category
 */
export function getEffectsByCategory(category) {
  return FILM_EFFECTS_LIBRARY[category] || [];
}

/**
 * Format effect for inclusion in a prompt
 * @param {string} effectId - ID of the effect
 * @returns {string} Formatted effect name
 */
export function formatEffect(effectId) {
  // Find the effect in the library
  for (const category in FILM_EFFECTS_LIBRARY) {
    const effect = FILM_EFFECTS_LIBRARY[category].find(e => e.id === effectId);
    if (effect) {
      return effect.name;
    }
  }
  return '';
}

/**
 * Generate an enhanced prompt based on selected effects
 * @param {string} basicPrompt - The user's base prompt
 * @param {string[]} effectIds - Array of selected effect IDs
 * @returns {string} Enhanced prompt with effects applied
 */
export function generateEnhancedPrompt(basicPrompt, effectIds = []) {
  if (!basicPrompt) {
    return '';
  }
  
  // Get formatted effect names
  const effectTexts = effectIds.map(formatEffect).filter(Boolean);
  
  // Add effects to the prompt
  let enhancedPrompt = basicPrompt;
  
  if (effectTexts.length > 0) {
    enhancedPrompt += ', ' + effectTexts.join(', ');
  }
  
  // Add final cinematic quality marker
  enhancedPrompt += ', cinematic quality';
  
  return enhancedPrompt;
}

/**
 * Apply a style preset to a prompt
 * @param {string} basicPrompt - The user's base prompt
 * @param {string} presetId - ID of the preset to apply
 * @returns {string} Enhanced prompt with preset applied
 */
export function applyStylePreset(basicPrompt, presetId) {
  const effectIds = getEffectsFromPreset(presetId);
  return generateEnhancedPrompt(basicPrompt, effectIds);
}

// Export video model constants for future use
export const VIDEO_MODELS = {
  GENERIC: 'generic',
  KLING: 'kl-ing',
  PIKA: 'pika',
  RUNWAY: 'runway',
  LUMA: 'luma',
  MIDJOURNEY: 'midjourney'
};

const filmEffects = {
  FILM_EFFECTS_CATEGORIES,
  FILM_EFFECTS_LIBRARY,
  STYLE_PRESETS,
  getAllCategories,
  getAllEffects,
  getEffectsByCategory,
  formatEffect,
  generateEnhancedPrompt,
  applyStylePreset,
  getEffectsFromPreset
};

export default filmEffects;