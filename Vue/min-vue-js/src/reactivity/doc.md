# vue 响应性相关的 API

- reactive
- ref
- computed
- watch
- watchEffect
  这些 API 可以分为两类：
- 被依赖者
  - reactive : reactive 中的值被改变，使用该值的值也会跟着改变
  - ref : ref.value 被改变，使用该值的值也会跟着改变
- 依赖者
  - computed : 依赖一个值，值被改变，这个值也会改变。
  - watch: 根据一个被依赖值创建一个函数，值被更改，会运行该函数
  - watchEffect : 创建一个函数，这个函数中使用了被依赖者，就会为该值绑定一个这个函数的依赖。

# 分配工作

由上可分配任务

- 被依赖者
  - 通知依赖，存储依赖。
- 依赖者
  - 将依赖消息发送给被依赖者，创建一个依赖区域。

# 细分

- reactive 和 ref 的区别在于，ref 监听 value 相当于一个 reactive 第一层只有一个 value 。
- computed 与 watchEffect 的区别在于 computed 会返回一个 `get`,`set` 对象。
  - 其中 `get` 就是 `watchEffect` , 只是会有一个阀门机制。在未被使用时，不做通知。
  - `set` 是一个自定义函数
- watch 就是 给 某个被依赖者绑一个 通知。只有该值更新才通知。

# 实现

总上可知，实现的主要功能应该是 reactive 和 watchEffect 两个 API ，其他 API 与这两个 API 有关联。

- reactive
  - 接收传递来的依赖
  - 存储依赖
  - 通知依赖。
- watchEffect
  - 创建依赖
  - 发送给 reactive 接收。

## reactive

### 接收传递来的依赖。

其中 reactive 接收依赖的方式分为以下 2 种

- watch 提交
- watchEffect 中使用产生
  所以实现方案如下：
- 在 watchEffect 定义的函数中 reactive 中 值被 get 的时候接收 watchEffect 依赖。
- 在 watch 定义的函数中 reactive 不接收依赖，最后 watch 提交一个依赖给 reactive

### 存储依赖。

- 创建 一个 reactive 时就要创建一个 map 来存储 依赖。所有的 map 会组成一个大的 map

```json
{
  "target1": {
    // reactive 定义的对象
    "key1": ["回调", "回调", "回调"], // 对象的每一个 Key
    "key2": ["回调", "回调", "回调"],
    "key3": ["回调", "回调", "回调"]
  },
  "target2": {
    "key1": ["回调", "回调", "回调"],
    "key2": ["回调", "回调", "回调"],
    "key3": ["回调", "回调", "回调"]
  }
}
```

### 通知依赖

- 通知依赖变得容易，只要在 `reactive` 值 的 `set` 中绑定一个 通知即可。
- 这个通知就是讲依赖从依赖树中取出，并循环依赖该值的 map 即可。

## watchEffect

### 创建依赖

接收一个函数，这个函数就是那个依赖。

### 发送给 reactive 接收。

因为有 watch 的缘故不能所有的 `reactive.get` 都收集依赖。所以，有一个开关。 在 watchEffect 的这块区域中，打开即可。

# 其他 相关的实现

## ref

- `ref` 就是 `reactive` 创建 `value` 所以本质就是创建一个 `{value:target}`
- 除此之外还有一些辅助的函数，例如`isRef`需要在`ref` 定义的壳中实现。

## computed

- `computed` 的 get 与 watchEffect 有些不同，他不会立即执行该函数。所以有一个执行时机的东西需要实现。
- `computed` 的 set 就是一个函数，这个函数只需要 在 修改 其`value` 时，调用所以 `computed` 是一个 `getvalue` 和 `setvalue` 的 组合。

## watch

- `watch` 要关闭 `reactive` 收集的特性。
- `watch` 要 给 相关的 `target` 发送一个收集
- `watch` 还有一些其他参数
  - `deep` 深监听，内部有变也要通知。
  - `immediate` 该回调将会在侦听开始之后被立即调用。
