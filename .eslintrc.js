module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'next/core-web-vitals',
    'plugin:jsx-a11y/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'jsx-a11y'],
  rules: {
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'curly': ['error', 'all'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': ['error', 'always']
  },
  ignorePatterns: [
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
  ]
};