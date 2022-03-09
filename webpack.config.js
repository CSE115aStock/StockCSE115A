const path = require('path')

module.exports = {
  entry: ['./frontend/src/index.js', 
        './node_modules/regenerator-runtime/runtime.js'],
output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'index.bundle.js'
},
  devServer: {
    port: 3010,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },

    ]
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
