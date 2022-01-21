## 自动编译

### 利用 webpack --watch 实现

配置 `webpack.config.js` 中的`watch:true` 选项就可以开启检测。每次修改会自动打包。

### 使用 `webpack-dev-server` 建立 web server

- `webpack-dev-server` 可以建立一个本地服务，
- `webpack-dev-server` 并不会将打包结果放入磁盘中，它只是临时将打包结果放入内存中，从而加快构建效率，提升开发体验。
- 从 `webpack-dev-server` v4 开始，HMR 是默认启用的。它会自动应用
- 详细配置 [https://webpack.js.org/configuration/dev-server/](https://webpack.js.org/configuration/dev-server/)

#### 安装

```shell
npm install --save-dev webpack-dev-server
```

#### 配置

在 `webpack.config.js` 文件中增加配置 `devServer`。

```cjs
module.exports = {
  devServer: {
    static: './dist'
  }
};
```

##### 静态资源访问的配置

webpack5 中配置项为`static`，它的默认目录就是`public`，可以给他传递一个`false`，可以将其设置为禁用。

##### 代理 API 配置项

主要是通过`devServer.proxy`配置项实现。[参考文档](https://webpack.js.org/configuration/dev-server/#devserverproxy)

#### 指令

```shell
yarn webpack serve --open
```

## Source Map

- `webpack` 打包后的代码是不易调试的，`Source Map`提供了调试服务。
- `Source Map` 就是一个信息文件，里面存储的源代码和编译之后的代码的对应信息，通过 Source Map 可以快速帮助我们定位。

### 配置

在 `webpack` 中配置 `devtool` 即可。[具体配置项目](https://www.webpackjs.com/configuration/devtool/#devtool)。常用的配置如下：

- `cheap-module-eval-source-map`：适用于开发环境；
- `none`：适用于生产环境；
- `hidden-source-map`：通常开发模块使用较多；
- `nosources-source-map`：适用于生产环境，该模式可以定位报错信息至具体一行，但是不会暴露源代码信息。

```cjs
module.exports = {
  // ...
  devtool: none // 不生成 source map
};
```

## HMR

在`webpack-dev-server` 模块中 HMR 已经安装了。

### 开启

#### 命令行

```shell
npx webpack-dev-server --hot
```

#### 配置文件开启

```cjs
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  /* more code */
  devServer: {
    // 1. 将 devServer.hot 设置为 true
    hot: true
  },
  plugins: [
    /* more code */
    // 3. 使用 HMR 插件
    // new HotModuleReplacementPlugin()
  ]
};
```

## 生产环境优化

生产环境与开发环境是不同的，例如 `HMR`、`Source Map`等功能在生产环境是不需要的。还有接口等一些业务上的不同也需要处理。

### 创建不同的配置

为不同的环境创建不同的配置，解决打包的问题。在 `webpack` 的配置中，可以接受两个参数`env`, `argv`分别表示当前环境，和命令行中的参数。

#### 通过 `env` 来配置

`env`可以通过命令行中 `--env` 配置。根据该参数 进行有差别的配置。

#### 多配置文件，配置。

大型项目的配置项增加，利用`env` 配置已经无法满足那么多的配置，需要多文件进行配置。可以利用`webpck-merge` 插件来进行配置。

##### 安装

```shell
yarn add webpck-merge -D
```

##### 配置

```cjs
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');
// 通过 merge 进行配置的合并 其实是两个 配置。
module.exports = merge(common, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin(), new CopyWebpackPlugin(['public'])]
});
```

##### 命令

```shell
npx webpack --config webpack.prod.js
```

## Tree-shaking

`webpack` 自带 `tree-shaking` 功能，配置 `optimization` 即可

```cjs
optimization: {
  // 模块只导出被使用的成员
  usedExports: true,
  // 尽可能合并每一个模块到一个函数中，这个功能称为 Scope Hoisting 这个概念是在 webpack3 中提出的
  concatenateModules: true,
  // 压缩输出结果，删除没有被使用的成员
  minimize: true
}
```

## sideEffects

- `sideEffects` 的用处是告诉 webpack 哪些是有副作用的那些是没有副作用的。没有副作用的文件会被`Tree-shaking`

- 配置 `package.json`.`sideEffects` 可以是一个数组，表示这些文件有副作用。或一个`boolean`值。表示该项目有副作用(`true`)或没有副作用(`false`)

```js
 "sideEffects": [ "*.css" ]
```

## 代码分包

### 多入口 & 多出口

#### 设置 入口 和 出口

设置多入口可以配置 `entry`

```js
module.exports = {
  entry: {
    // 对象中的每一个属性表示一个入口，属性名表示文件名称
    index: './src/index.js',
    album: './src/album.js'
  },
  output: {
    // name: 表示 entry 中的属性名称，这里的输出结果最终为两个文件
    // hash：项目级别的Hash
    // chunkhash：块级别的Hash
    // contenthash：文件级别的Hash，推荐使用
    filename: '[name]-[contenthash:8].bundle.js'
  }
};
```

#### 设置 HTML 注入

```cjs
new HtmlWebpackPlugin({
  title: 'Multi Entry',
  template: './src/index.html',
  filename: 'index.html',
  // 值为 entry 中的属性名称
  chunks: ['index'],
}),
```

#### 设置 共有

```Javascript
{
  optimization:{
   splitChunks: {
    // 自动提取所有公共模块到单独 bundle
    chunks: 'all',
    minSize:1 // 当文件超出这个值才会分包
   }
  },
 }
}
```
