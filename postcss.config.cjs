module.exports = {
  plugins: {
    'postcss-preset-env': {
      features: {
        'nesting-rules': {
          noIsPseudoSelector: false
        }
      }
    },
    'tailwindcss/nesting': {}
  }
}
