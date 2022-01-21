# webpack 中常用的插件

## 配置

webpack 插件 配置在`plugins` 中。

## 常用插件与插件使用场景。

- clean-webpack-plugin：可以帮助我们自动情况 dist 目录的插件；
- html-webpack-plugin： 自动生成使用打包结果的 HTML；创建多个可以打包出多个 入口 html。
- copy-webpack-plungin：将已经存在的单个文件或整个目录复制到构建目录。

```cjs
{
  plugins: [
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
      template: 'index.html'
    }),
    // 生成多个页面 创建多个 HtmlWebpackPlugin 实例，用于生成 about.html
    new HtmlWebpackPlugin({
      // filename 默认为 index.html
      filename: 'about.html'
    }),
    // 拷贝不需要打包的内容
    new CopyWebpackPlugin([
      // 'public/**'
      // 直接拷贝 public 下所有内容至输出目录
      'public'
    ])
  ];
}
```
