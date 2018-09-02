const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './src/js/app.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0']
          }
        }
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function() {
                  return [autoprefixer('last 2 versions')]
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /.(jpg|png)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: 'img/',
          }
        }
      }
    ]
  },
  plugins: [
    extractPlugin,
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['build'])
  ]
}
