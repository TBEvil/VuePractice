const path = require('path');
const VueLoaderPlugin =  require('vue-loader/lib/plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');


const config ={
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname,'dist')
  },
  resolve:{
    extensions: ['.js','.vue']
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module:{
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(scss|css)/,
        loader: ['vue-style-loader','css-loader','sass-loader']
      }
    ]
  },
  plugins:[
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
      chunks: ['app'],
      hash: true
    }),
  ]
};
module.exports = config;