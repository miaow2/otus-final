const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'ru'],
    }),
  ],
};