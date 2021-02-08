// load babel load
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: "./frontend/src/index.js",
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
    path: path.resolve(__dirname, 'frontend/dist'),
  },
  plugins:[
    new CleanWebpackPlugin(), 
    new HtmlWebpackPlugin({template: './frontend/template/index.html'})
    ],

  devServer: {
    contentBase: path.resolve(__dirname, 'frontend/dev'),
    hot: true,
    // host: "dev.domain.com",
    port: 8080,
    // proxy: "http://localhost:8000"
    proxy: {
      "/static":"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static",
      "/": "http://localhost:8000",
    },
  },

};
