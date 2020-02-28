const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode:'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '3d-elements.js',
    library: 'e3d',
    libraryTarget: 'this',
  },
};