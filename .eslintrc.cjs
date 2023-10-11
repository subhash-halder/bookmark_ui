module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard-with-typescript', 'plugin:vue/vue3-essential', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'script',
        project: ['./tsconfig.json', './tsconfig.node.json'],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    extraFileExtensions: ['.vue'],
  },
  plugins: ['vue', 'prettier'],
  rules: {
    "prettier/prettier": 2,
    "quotes": "off",
    "@typescript-eslint/quotes": ["error", "single"],
    // semi: 'off',
    // '@typescript-eslint/semi': ['error', 'always'],
    // 'comma-dangle': 'off',
    // '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    // 'space-before-function-paren': 'off',
    // '@typescript-eslint/space-before-function-paren': 'off',
  },
};
