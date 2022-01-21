const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const devConfig = require('./webpack.dev');
const proConfig = require('./webpack.prod');

module.exports = (env, argv) => {
  let config = argv.mode === 'development' ? devConfig : proConfig;
  return merge(common, config);
};
