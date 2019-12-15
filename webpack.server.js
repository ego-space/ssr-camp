const path = require('path')
const nodeExternals = require('webpack-node-externals')

// 服务端webpack
module.exports = {
  target: 'node',
  mode: 'development',
  entry: path.resolve(__dirname, './server/index.js'),
  externals: [nodeExternals()],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
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
              '@babel/preset-env',
              {
                'useBuiltIns': 'usage',
                'corejs': {
                  'version': 2
                }
              },
              
            ]
          ],
          plugins: [
            '@babel/plugin-transform-runtime'
          ]
        }
      }
    ]
  }
}
