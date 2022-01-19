# 资源模块

- 除了 js 文件之外，我们还可以通过 `Loader` 加载任意类型的的资源模块
- `Loader`是`webpack`的实现整个前端模块化的核心，通过加载不同的`loader`，从而可以实现任意类型资源的加载。

## css 资源

要注意的是 他会将 `css` 也打包到 `js` 中，不会产生 `css` 文件。

```shell
npm i style-loader css-loader -D
```

```cjs
const path = require('path');
module.exports = {
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
      }
    ]
  }
};
```

## 图片资源

使用`url-loader` `file-loader` 配合来处理图片资源。增加一个新的 loader

```shell
npm i url-loader file-loader -D
```

```javascript
{
  test: /\.(png|jpe?g|gif)$/i,
  use: {
    loader: 'url-loader',
    options: {
      // 小于这个值的通过url-loader，转换为DataURL，否则使用file-loader
      limit: 10 * 1024
    }
  }
}
```

## 处理 ES6+

增加 babel `loader` 来解决, `babel` 只负责对语法进行编译。当我们写尖头函数，`babel` 会帮你把它编译成普通函数，这没有任何问题，但是，比如说我们代码里使用了`promise`，`babel`打包出来的代码其实还是`promise`

```shell
npm i babel-loader @babel/core @babel/preset-env -D
```

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
```

## 开发一个 Loader

Loader 作为 webpack 的核心机制，实现原理呢也比较简单，现在我们就来开发一款属于自己的 Loader。

- 构建一个函数，这个函数接收文件内容。
- 对内容进行处理，然后返回
- 在 `rules` 中增加对 该文件的监听。
