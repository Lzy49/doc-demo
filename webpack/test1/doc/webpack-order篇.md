# webpack 是做什么的

## 定义

webpack 是一个现代的打包模块化的 JavaScript 工具。它就是用来打包的。

## 流程

在 webpack 中一切文件（JavaScript、CSS、SCSS、图片）皆模块，在内部通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。

## webpack 的优点

- 社区庞大且活跃，在前端发展速度如此快的今天，可以很快找到最新的 Plugin；
- 使用场景不限于 Web 开发；

## 构建

```shell
npm i webpack webpack-cli -D
```

## 配置

### 默认配置

自从`webpack4`开始，`webpack`支持 0 配置的方式，它的默认入口文件是`src/index.js`，默认出口文件是`dist/main.js`。如想要自定义 需 在根目录下创建一个`webpack.config.js`文件，来自定义这些配置。

### 自定义配置

在根目录中创建`webpack.condfig.js` 进行配置，其遵循`CommonJS`模块化规则。

```cjs
const path = require('path');
module.exports = {
  // 入口文件
  entry: './src/main.js',
  // 出口配置
  output: {
    // 配置出口文件名
    filename: 'index.js',
    // 文件输出目录，必须是绝对目录
    path: path.join(__dirname, 'output')
  }
};
```

### 工作模式

工作模式可以通过命令行 `—mode` 字段配置。

- `none`：不会进行代码的优化操作，可读性最高，打包速度最快
- `production`：默认值，该模式会对代码进行压缩
- `development`：自动优化打包速度，添加一些调试过程的辅助
