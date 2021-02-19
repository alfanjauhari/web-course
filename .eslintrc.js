module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: ['standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'prettier/prettier': 'warn'
  },
  plugins: ['prettier']
};
