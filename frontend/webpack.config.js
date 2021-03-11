// load babel load
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src', 'index.js')
  },
  module: {
    rules: [
      {
        test: /\.js$/, //any js files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname,'dist'),
  },
  plugins:[
    new CleanWebpackPlugin(), 
    new HtmlWebpackPlugin({template: path.resolve(__dirname, 'template', 'index.html')})
    ],

  devServer: {
    contentBase: path.resolve(__dirname, 'dev'),
    hot: true,
    // host: "dev.domain.com",
    port: 3000,
    // proxy: "http://localhost:8000"
    proxy: {
      "/static":"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static",
      "/": "http://localhost:8000",
    },
  },

};

