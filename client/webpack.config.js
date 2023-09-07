const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point
  entry: './client/src/index.js',

  // Output bundle
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js'
  },

  // Loaders and rules
  module: {
    rules: [
      {
        test: /\.js$/, // Regular expression to match all .js files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html' // Location of your index.html template
    })
  ],

  // Dev Server settings
  devServer: {
    static: path.resolve(__dirname, 'client/dist'), // Serve files from this directory
    port: 8080,
    historyApiFallback: true, // Redirect 404s to index.html
  }
};
