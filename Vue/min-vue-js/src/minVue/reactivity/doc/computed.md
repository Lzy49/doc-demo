# computed

## 使用一下

在使用中我们知道：

- computed 的 接收两种参
  - 函数 ：get
  - 对象 ：get , set
- computed 的 get 函数 只会 在值被引用时调用，且只会调用一次，值会进行缓冲。
- 当 get 中的 响应值发生改变时，该 get 函数会被触发。

## 结合当前代码

从以上几个点，与现有的代码联系可以得到：

- computed 的 get 和 effect 是有区别的，不可立即执行。
- computed 的 set 是一个 修改依赖的函数，但是与正常的修改过程不同，所有依赖被修改后仅触发一次通知。

## 实现

### computed 在不被 get 时，不添加响应

给 `effect` 函数 传入 `lazy:true` 配置,并将`effect` 保存后，在`get` 时手动促发

### computed 的值有缓存功能

给 `computed` 类增加 私有变量 `val` 保存值，`_dirty` 保存值状态。如果 `_dirty` 为 `false` 时直接取`val` 否则执行`effect`

> 实现上两步后，`computed` 的 `get` 功能就可以使用了。

### computed get 优化。

#### 问题

现在只对第一次使用做了限制，当`computed` 的 `get` 函数中有多个依赖值时，第二次更改 `get` 会被执行两次，这会消耗性能。

#### 解决

使用 `effect` 的 `scheduler` 配置项来避免这个坑。在 `scheduler` 中设置 `_dirty` 为 `true` 即可。等下次被 `get` 时就会直接获取新值。

### computed set 值

computed 的 set 函数值需要执行以下 传入的 setter 函数即可。其中的依赖值发生改变时也会发处通知的。

### computed 做为一个值 被其他 computed 依赖

computed 值不单单是一个依赖其他值变化的值。而且是一个被依赖值。在它的值发生改变时应该通知所有其他值，要一起做出反应。所以 在 `scheduler` 要`trigger`其依赖值。

@todo computed 依赖两个值 通知，是否只会通知一个值。
