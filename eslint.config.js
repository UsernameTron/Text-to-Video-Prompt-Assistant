import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    files: ['**/*.js', '**/*.jsx'],
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'public/**',
      'netlify/functions/**',
      'coverage/**',
      '*.md',
      'utility-functions.js',
      'main-app-files.js',
      'components.txt',
      'page-components.txt',
      'styles.txt',
      'deployment-guide.txt',
      'netlify-project.txt',
      'resource-files.json'
    ],
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always']
    }
  }
];