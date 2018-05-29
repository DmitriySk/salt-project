let path = require('path');

module.exports = function (dirname) {
  return {
    modules: [
      path.resolve(dirname, 'src'),
      path.resolve(dirname, 'node_modules')
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  };
};