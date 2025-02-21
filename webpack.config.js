const defaults = require('@wordpress/scripts/config/webpack.config');

module.exports = {
  ...defaults,
  externals: {
    react: 'React',
    '@wordpress/element': ['wp', 'element'], // Externalize WordPress element
    'react-dom': 'ReactDOM',
  },
}; 