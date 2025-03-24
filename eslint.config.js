const globals = require('globals');
const js = require('@eslint/js');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');

module.exports = [
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'curly': ['error', 'all'],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
      'jsx-a11y/no-noninteractive-tabindex': 'off'
    },
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
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];