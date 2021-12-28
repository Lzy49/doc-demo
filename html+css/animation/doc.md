# 变形
## 概念
- X 轴 ：类似单杠 
- Y 轴 ：类似门轴 origin 为 left 时 是单门，是 center 是 转门
- Z 轴 ：类似方向盘
- 视角距离：观察 3D 物体的 距离，约等于 width * 1.2
- 视角位置：观察 3D 物体的 位置，50%，50% 时是正中间。
## transform
### 作用
对目标元素进行转换。
### 2D 接收值
#### translate()
接收两个值 (x,y) ,对元素进行移动
#### rotate()
接收一个值 单位为`deg` 表示对元素进行旋转操作，`deg` 为旋转角度。
#### scale()
接收两个值 x 和 y ，表示对元素的 width , height 进行增加多少倍。
### skew()
接收两个值 表示 根据 x,y轴，倾斜多少`deg` 
### 3D 接收值
#### rotateY() 
接收一个值 单位为`deg` 表示 Y 轴旋转
#### rotateX() 
接收一个值 单位为`deg` 表示 X 轴旋转
#### rotateZ() 
接收一个值 单位为`deg` 表示 Z 轴旋转
#### perspective()
接收一个距离值`px` ,`%` 为 该 div 元素设置视角距离
## transform-origin 
### 作用
定义 转换基准点
### 接收值
接收两个值（x,y) 可以是`top`,`center`,`bottom`,`length`,`%`
## perspective
### 作用
设置 视角距整个视口位置。
### 接收值
接收 一个 值 `px` , `%` 
### 位置
定义在舞台元素上（定义变形元素的父元素）
## perspective-origin
### 作用
设置视角在窗口的什么位置
### 接收值
接收两个值，分别表示 x，y 轴坐标， 50% ，50% 就是中心点
### 位置
定义在舞台元素上（定义变形元素的父元素）
##  transform-style
### 作用
设置展示风格，一般使用`preserve-3d`
### 接收值
- `preserve-3d`
- `flat`
### 位置
与 `perspective` 相同定义在舞台元素上（定义变形元素的父元素）
## backface-visibility
### 作用
设置元素背面是否可见
### 接收值
- `hidden` 表示背面不可见
- `visible` 表示背面可见
## 总结
- transform 可以进行 2D 和 3D 的变形， 2D 不需要设置视角， 3D 需要使用 `perspective` + `perspective-origin` 设置。
- 2D 转换分为 
  - `translate` 移动
  - `rotate` 旋转
  - `scale` 缩放
  - `skew` 拉升
- 3D 转换份为
  - `rotateY` 垂直 翻转
  - `rotateX` 水平 翻转
  - `rotateZ` 旋转
- 变形时需要有一个点作为参考点，使用`transform-origin`定义参考点，来进行变形
# 过度
## transition
### 作用
为一个属性，或多个属性设置过度。
### 值
- `transition-property` `transition-duration` `transition-timing-function` `transition-delay`
### transition-property
#### 作用
得到要进行过度的属性
#### 值
- `all`: 表示所有的属性都参与
- `property`:一个属性队列，使用`,` 隔开
### transition-duration
#### 作用
定义这个过度要多长时间
#### 值
- `xxxs` 表示 多少秒
- `xxx` 表示 多少毫秒
### transition-timing-function 
#### 作用
定义过度时运行速度轨迹。
#### 值
- `linear` 以同样的速度运行
- `ease` 慢快交替，`cubic-bezier(0.25,0.1,0.25,1)`
- `ease-in` 慢开快结束，`cubic-bezier(0.42,0,1,1)` 
- `ease-out` 慢结束快开，`cubic-bezier(0,0,0.58,1)`
- `ease-in-out` 慢开慢结束，`cubic-bezier(0.42,0,0.58,1)`
- `cubic-bezier(n,n,n,n)` 自己定义 (`n` > 0 && `n` < 1)
### transition-delay
#### 作用
延迟执行过度效果
#### 值
- `xxxs` 表示 多少秒
- `xxx` 表示 多少毫秒
# 动画
## @keyframes
### 作用
定义一个动画
### 接收
#### name
每个 `@keyframes`  都必须跟随一个`name` 来标记该动画。
#### select
在 `name` 后跟随一个 `{}` 其中定义了 `select` ,可以创建任意时间点的元素行为：
- `0-100%` 其中任意数字
- `from` 相当于 0 
- `to` 相当于 100%
#### selectValue
在创建的每一个时间点都要定义一组样式使用`{}` 包裹。表示运行到某时时，会是什么效果。
## animation
### 作用
给 元素 配置动画，以及动画的一些属性
### 写法
`animation: name duration timing-function delay iteration-count direction fill-mode play-state;`
### animation-name
#### 作用
`@keyframes` 的唯一识别。
#### 值
字符串
### animation-duration
#### 作用
定义动画多少秒执行好
#### 值
- `xxxs` 表示 多少秒
- `xxx` 表示 多少毫秒
### animation-timing-function 
#### 作用
执行动画的运行轨迹
#### 值
- `linear` 以同样的速度运行
- `ease` 慢快交替，`cubic-bezier(0.25,0.1,0.25,1)`
- `ease-in` 慢开快结束，`cubic-bezier(0.42,0,1,1)` 
- `ease-out` 慢结束快开，`cubic-bezier(0,0,0.58,1)`
- `ease-in-out` 慢开慢结束，`cubic-bezier(0.42,0,0.58,1)`
- `cubic-bezier(n,n,n,n)` 自己定义 (`n` > 0 && `n` < 1)
- `steps(int,start|end)` 接收 2个值
  - 第一个值表示 将动画分为多少份走，
  - 第二个值表示 动画运行到第几份时间段时展示`start` 这个时间段开始的样子还是`end` 这个时间段结束的样子。
### animation-delay
#### 作用
等待运行时间
#### 值
- `xxxs` 表示 多少秒
- `xxx` 表示 多少毫秒
### animation-iteration-count
#### 作用
定义运行动画运行几次
#### 值
- `n` number 表示多少次
- `infinite` 表示无限次

### animation-direction
#### 作用
定义是否循环交替反向播放动画
#### 值
- `normal` 动画正常执行
- `reverse` 动画反向播放
- `alternate` 动画先正后反，先正后反
- `alternate-reverse` 动画先反后正，先反后正
- `initial` 默认

### animation-fill-mode
#### 作用
规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。
#### 值
- `forwards` : 由次数决定，定格最后一次样子
- `backwards` : 由第一次执行时决定，与开头的样式相同
- `both` : `forwards` + `backwards`
### animation-play-state
#### 作用
规定当前元素是否进行动画
- `paused`	指定暂停动画	
- `running` 	指定正在运行的动画
# 参考
(张鑫旭大佬的博文)[https://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/]