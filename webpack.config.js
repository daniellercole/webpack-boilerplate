var ExtractTextPlugin = require('extract-text-webpack-plugin'); 
var path = require('path');
var webpack = require('webpack');
var outputDir = '/build';
var entry = ['./js/main.js', './scss/app.scss'];
var cssOutput = 'app.css';


 module.exports = {
     entry: entry,
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'app.js' 
     },
     module: {
         rules: [
            {
              test: /\.js$/,
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/transform-object-assign']
              },
              
            },
            {
              test: /\.scss$/,
              use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[name].css'
                    }
                  },
                  {
                    loader: 'sass-loader'
                  }
              ]
            }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };
