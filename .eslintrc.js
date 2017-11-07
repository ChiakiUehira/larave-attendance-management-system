module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  plugins: [
    'html',
    'vue'
  ],
  rules: {
    // "vue/html-indent": ["error", 2, {
    //   "attribute": 1,
    //   "closeBracket": 0,
    //   "ignores": []
    // }]
  },
  globals: {
    use: false,
    make: false
  },
}