# 浏览器是如何渲染 HTML + CSS
1. css 和 html 分别 通过 解析器 解析为 css 树 和 DOM 树。
2. css 树 和 DOM 树 结合 形成 渲染树
3. 根据渲染树 与 浏览器信息 计算出 每个可见元素节点的 位置，尺寸
4. 将计算结果 发送 给 CPU 进行渲染。
其中 第 3 步的过程就是 `回流` , 第 4 步的过程就是 `重绘`
# 什么时候会触发 回流， 什么时候 会触发 重绘
## 回流
### 浏览器渲染 触发回流
根据上面的渲染流程，可以知道回流是为了计算位置和尺寸，得知以下几种情况会执行：
- 修改渲染树:
  - 修改DOM树 加载，增加，删除 可见DOM（例如：删除某元素）
  - 修改CSS关于尺寸，位置部分。(例如：border,height,width,margin)
- 修改浏览器关于尺寸部分（例如：缩放浏览器大小）
> 要注意的是 修改DOM树 有一个 `可见DOM`的条件，是否可见是由`display:none` 来决定的。其他例如`visibility`不能决定元素是否可见。
### 浏览器优化 触发回流
因为回流是会增加性能消耗的，所以浏览器利用队列来处理回流操作：将所有回流相关的操作放入队列，直到过一段时间或 队列达到阈值时，一起执行。因为这个优化，当我们要获取实时的关于尺寸，位置信息的时，浏览器会将队列中的操作全部执行后给我们最新的信息。例如：
- offsetTop、offsetLeft、offsetWidth、offsetHeight
- scrollTop、scrollLeft、scrollWidth、scrollHeight
- clientTop、clientLeft、clientWidth、clientHeight
- getComputedStyle()
- getBoundingClientRect
具体查询：`https://gist.github.com/paulirish/5d52fb081b3570c81e3a`
## 重绘
- 重绘是回流的下一步，所以每次回流就会执行一次重绘。
- 修改 css 会导致 重绘例如 修改 `background-color`
# 优化
经过渲染流程可知，优化的方向就是减少回流和重绘的次数。
## js 
### 自己优化
#### 缓冲信息
在获取信息时（例如：`offsetTop`），应对获取的信息缓存，而不是每次都进行获取。
### 浏览器已帮忙
#### 合并修改 css
当修改多个css样式时，不应直接修改`el.style.xx` 属性，而是将多条css样式拼接 修改 `el.style.cssText` 属性。或 修改 该 DOM的样式表（`class`,`id`)
#### 修改DOM
当要修改DOM时应让多次修改在同一时间处理，所以让要修改的DOM脱离文本流就是解决思路：
- 将元素`display:none`后修改，改好后再重新修改`display`展示
- 使用`document.createDocumentFragment`创建文档片段 将 要增加的DOM一次性增加到DOM中
- 拷贝要修改的DOM修改后替换旧的DOM
## css
### 尽量使用 css3硬件加速 来处理动画
`transform`、`opacity`、`filters`这些动画不会引起回流重绘 。但是对于动画的其它属性，比如`background-color`这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。
### 让复杂动画绝对定位让其脱离文档流
对于复杂动画效果，由于会经常的引起回流重绘，因此，我们可以使用绝对定位，让它脱离文档流。否则会引起父元素以及后续元素频繁的回流。