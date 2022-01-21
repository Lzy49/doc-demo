const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'common',
  entry: {
    index: './src/main.js',
    admin: './src/admin.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/assets/'
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'I love webpack',
      meta: {
        viewport: 'width=device-width'
      },
      // 使用哪个 HTML 文件作为模板
      template: './index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      title: 'I love webpack',
      meta: {
        viewport: 'width=device-width'
      },
      // 使用哪个 HTML 文件作为模板
      template: './index.html',
      chunks: ['admin']
    })
  ],
  module: {
    rules: [
      {
        // 模块的匹配规则
        test: /.css$/,
        // 从后往前执行，每一项都是一个loader
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        generator: {
          filename: 'css/[name].[contenthash:8][ext][query]'
        }
      },
      {
        test: /.jpg$/,
        use: {
          loader: 'url-loader',
          options: {
            // 小于这个值的通过url-loader，转换为DataURL，否则使用file-loader
            limit: 10 * 1024
          }
        }
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /.md$/,
        // 除了使用文件名，也可以使用路径的方式引入 loader
        use: ['html-loader', './markdown-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      // 自动提取所有公共模块到单独 bundle
      chunks: 'all',
      minSize: 1
    }
  }
};
