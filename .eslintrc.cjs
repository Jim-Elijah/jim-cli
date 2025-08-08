// ESLint does not support ESM configuration at this time.
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    requireConfigFile: false,
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
  },
};
