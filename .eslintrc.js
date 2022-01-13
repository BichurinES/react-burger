module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jsx-a11y',
  ],
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
    'react/function-component-definition': [2, { namedComponents: 'function-declaration' }],
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': [2, { props: false }],
  },
};
