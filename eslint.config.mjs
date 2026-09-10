import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    ignores: [
      'build/**',
      'dist/**',
      'coverage/**',
      '.vscode/**',
      '.github/**',
      '.husky/**',
      '**/*.md',
      '**/*.yaml',
    ],
  },
  ...compat.extends('airbnb-base', 'plugin:prettier/recommended'),
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import/core-modules': ['giget'],
    },
    rules: {
      'no-var': 2,
      'no-unused-vars': [
        1,
        {
          vars: 'all',
        },
      ],
      'no-console': 0,
      'no-param-reassign': 1,
      'import/prefer-default-export': 0,
      'no-restricted-syntax': 1,
      'no-control-regex': 1,
      'no-await-in-loop': 1,
      'import/extensions': [2, { js: 'never', json: 'always', mjs: 'always' }],
      'no-shadow': 1,
    },
  },
  {
    files: ['eslint.config.mjs'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
