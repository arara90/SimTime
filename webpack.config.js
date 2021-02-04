// load babel load
const path = require("path");
console.log("webpack.start");
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
  devServer: {
    contentBase: "./dist",
    hot: true,
    proxy: {
      "/static":
        "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static",
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "static/frontend"),
  },
};
