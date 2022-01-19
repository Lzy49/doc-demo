const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const myWebpackPlugin = require('./myWebpackPlugin');
module.exports = {
  // watch: true,
  // devServer: {
  //   contentBase: path.join(__dirname, 'public')
  // },
  devtool: 'eval-source-map',
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist')
    // publicPath 用于表示资源的打包后的资源前缀，默认为空
  },
  module: {
    rules: [
      {
        // 模块的匹配规则
        test: /.css$/,
        // 从后往前执行，每一项都是一个loader
        use: ['style-loader', 'css-loader']
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
            // presets: [['@babel/preset-env', { targets: "ie 8" }]]
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
  plugins: [
    // new myWebpackPlugin(),
    // 用于清空 dist 目录
    new CleanWebpackPlugin(),
    // 用于生成 index.html
    new HtmlWebpackPlugin({
      // 添加 title 属性，在 HTML 文件中通过 htmlWebpackPlugin.options.title 获取，采用 Lodash 模板语法书写
      title: 'Webpack Plugin Sample',
      // 添加一个 meta 元素，name 为 viewport content 为 width=device-width
      meta: {
        viewport: 'width=device-width'
      },
      // 使用哪个 HTML 文件作为模板
      template: './index.html'
    }),
    // 生成多个页面 创建多个 HtmlWebpackPlugin 实例，用于生成 about.html
    new HtmlWebpackPlugin({
      // filename 默认为 index.html
      filename: 'about.html'
    }),
    // 拷贝不需要打包的内容
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: 'public' }]
    })
  ]
};
