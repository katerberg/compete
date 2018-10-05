'use strict'

const { VueLoaderPlugin } = require('vue-loader')
const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    './ui/app.js'
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../public')
  }
}
