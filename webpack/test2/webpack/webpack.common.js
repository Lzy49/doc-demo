// webpack/webpack.common.js

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  return {
    mode: webpackEnv,
    entry: './src/index.ts',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        // css 资源
        {
          test: /.css$/i,
          use: [
            'style-loader',
            // 'css-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[hash:base64:8]'
                }
              }
            },
            {
              // css兼容性处理
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      {
                        autoprefixer: {
                          flexbox: 'no-2009'
                        },
                        stage: 3
                      }
                    ]
                  ]
                }
              }
            }
          ]
        },
        // scss 资源
        {
          test: /.(scss|sass)/i,
          use: ['sass-loader']
        },
        // img 资源
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          type: 'asset',
          generator: {
            filename: 'image/[name].[contenthash:8][ext][query]'
          }
        },
        // babel 解析 js
        {
          test: /\.(ts|js)$/,
          include: path.resolve(__dirname, './src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env', // 它是转译插件的集合。
                    {
                      useBuiltIns: 'usage', // 按需加载
                      corejs: 3 // 加载版本
                    }
                  ],
                  [
                    '@babel/preset-react', // babel jsx 转换 react
                    {
                      runtime: 'automatic'
                    }
                  ],
                  '@babel/preset-typescript'
                ]
              }
            }
          ]
        },

        // 其他资源
        {
          exclude:
            /\.(html|js|mjs|ejs|jsx|tsx|css|scss|sass|png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html')
      })
    ]
  };
};
