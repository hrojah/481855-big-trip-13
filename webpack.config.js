`use strict`

const path = require(`path`);

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, './src/utils'),
      '@view': path.resolve(__dirname, 'src/view'),
      '@presenter': path.resolve(__dirname, 'src/presenter')
    }
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    watchContentBase: true,
  }
};
