
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-jsx-a11y'],
  extends: ['eslint-config-ts', 'plugin:prettier/recommended'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/interface-name-prefix': [
      'error',
      { prefixWithI: 'always', allowUnderscorePrefix: true }
    ],
    '@typescript-eslint/class-name-casing': [
      'error',
      {
        allowUnderscorePrefix: true
      }
    ],
    '@typescript-eslint/unbound-method': 0,
    'comma-dangle': ['error', 'never'],
    'import/no-unresolved': 0,
    'import/named': 0,
    'react/prop-types': ['error', { ignore: ['children'] }],
    'jsx-a11y/heading-has-content': 0,
    'react/prop-types': 0
  }
};
