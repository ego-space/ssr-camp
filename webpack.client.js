const path = require('path')
const HtmlWebpackPlguin = require('html-webpack-plugin')

// 服务端webpack
module.exports = {
  target: 'node',
  mode: 'development',
  entry: path.resolve(__dirname, './client/index.js'),
  // 客户端输出
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
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
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlguin({
      filename: 'index.csr.html',
      template: 'src/index.csr.html',
      inject: true
    })
  ]
}
