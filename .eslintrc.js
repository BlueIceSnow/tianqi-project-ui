module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'vue/no-multiple-template-root': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
    'no-empty': 'off',
    'prettier/prettier': 'error',
    'import/no-unresolved': 'off',
    'no-shadow': 'off',
    'operator-assignment': 'off',
    'prefer-destructuring': 'off',
    'no-use-before-define': 'off',
    'for-direction': 'off',
    'no-plusplus': 'off',
    'vue/valid-template-root': 'off',
  },
};