const path = require('path')
const nodeExternals = require('webpack-node-externals')

// 服务端webpack
module.exports = {
  target: 'node',
  mode: 'development',
  entry: path.resolve(__dirname, './server/index.js'),
  externals: [nodeExternals()],
  output: {
    file: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rule: [
      { 
        test: /\.js$/,
        // 支持import，支持jsx
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            [
              '@babel/preset-env'
            ]
          ]
        }
      }
    ]
  }
}
