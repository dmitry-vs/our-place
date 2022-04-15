module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: ['eslint:recommended', 'prettier', 'plugin:storybook/recommended'],
  rules: {
    'no-console': 'warn',
  },
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
