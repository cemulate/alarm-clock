const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.js',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './src'),
      'node_modules',
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
      },
      {
         test: /\.(png|jpg|gif)$/,
         use: [
           {
             loader: 'url-loader',
             options: {
               limit: 8192
             }
           }
         ]
     },
     {
       test: /\.vue$/,
       loader: 'vue-loader',
     }
    ]
  },
  plugins: [
    new UglifyJSPlugin({sourceMap: true}),
    new ExtractTextPlugin('styles.css'),
    new BundleAnalyzerPlugin({analyzerMode: 'disabled'}),
  ]
};
