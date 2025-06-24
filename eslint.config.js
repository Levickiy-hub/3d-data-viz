// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: [
      js.configs.recommended,
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:react-refresh/recommended',
    ],
    rules: {
      // 🔧 Общие JS-правила
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
      'no-duplicate-imports': 'error',

      // 🔧 React-специфичные
      'react/jsx-key': 'warn',
      'react/prop-types': 'off',
      'react/display-name': 'off',

      // 🔧 Hooks
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
])
