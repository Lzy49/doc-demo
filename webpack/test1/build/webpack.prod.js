const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
module.exports = {
  mode: 'production',
  plugins: [
    // 用于清空 dist 目录
    new CleanWebpackPlugin(),
    // 拷贝不需要打包的内容
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: 'public' }]
    }),
    new DefinePlugin({
      API_BASE_URL: JSON.stringify('https://api.example.com')
    })
  ],
  optimization: {
    // 模块只导出被使用的成员
    usedExports: true,
    // 尽可能合并每一个模块到一个函数中，这个功能称为 Scope Hoisting 这个概念是在 webpack3 中提出的
    concatenateModules: true,
    // 压缩输出结果，删除没有被使用的成员
    minimize: true
  }
};
