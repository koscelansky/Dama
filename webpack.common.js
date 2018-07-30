const path = require('path')

module.exports = {
  entry: {
    app: './app/app.js',
    worker: './app/worker.js'
  },
  output: {
    path: path.join(__dirname, '/public/js/generated/'),
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
