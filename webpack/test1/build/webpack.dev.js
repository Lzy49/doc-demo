const { DefinePlugin } = require('webpack');
module.exports = {
  // watch: true,
  mode: 'dev',
  // 开启 server
  devServer: {
    hot: true
  },
  // 增加 map
  devtool: 'eval-source-map',
  plugins: [
    new DefinePlugin({
      API_BASE_URL: JSON.stringify('https://api.example.com')
    })
  ]
};
