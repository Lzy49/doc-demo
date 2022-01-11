# reactive

## reactive.js

功能：判断是否是对象，是对象就注册成一个 Proxy。

```js
import { mutableHandlers } from './baseHandlers';
import { isObject } from '../../shared/index';
// 用于创建一个 响应值。
export function reactive(target) {
  // 如果值是一个 对象，则进行响应处理，如果不是则警告并返回原值。
  if (!isObject(target)) {
    console.warn(`reactive ${target} 必须是一个对象`);
    return target;
  }
  return new Proxy(target, mutableHandlers);
}
```

## baseHandlers.js

功能：创建一个 mutableHandlers

- get：
  - 获取值
  - track 收集
  - 如果取的值是 对象 递归子级，给所有子级 track
- set:
  - 设置值
  - trigger 通知

```js
// 创建 响应值的 Proxy 的 hander
import { trigger, track } from './effect';
import { isObject } from '../../shared';
import { reactive } from './reactive';
export const mutableHandlers = {
  get(target, key) {
    /**
     * 在 get 方法中：
     * - 获取值
     * - track
     * - 如果取的值是 对象 递归子级，给所有子级 track
     */
    const res = Reflect.get(target, key);
    track(target, key);
    return isObject(res) ? reactive(res) : res;
  },
  set(target, key, value) {
    /**
     * 在 set 方法中
     * - 设置值
     * - trigger
     */
    const res = Reflect.set(target, key, value);
    trigger(target, key);
    return res;
  }
};
```

## Effect.js

- 创建收集依赖作用域
- 通知依赖
- 收集依赖

```javascript
let activeEffect = null;
let reactiveMap = new WeakMap();
// 用于创建一个收集依赖的作用域。在该作用域中执行的函数都将收集依赖。
export const effect = (fun) => {
  // 将作用域的函数收集到，然后执行并给所有响应值添加上。
  activeEffect = fun;
  try {
    fun();
  } catch (res) {
    window.console.error('effect', res);
  }
  activeEffect = null;
};
// 通知依赖
export const trigger = (target, key) => {
  // set 执行
  const set = reactiveMap?.get(target)?.get(key);
  set && set.forEach((effectFun) => effectFun());
};
// 收集依赖
export const track = (target, key) => {
  // get 执行
  if (!reactiveMap.has(target)) {
    reactiveMap.set(target, new Map());
  }
  const targetMap = reactiveMap.get(target);
  if (!targetMap.has(key)) {
    targetMap.set(key, new Set());
  }
  const set = targetMap.get(key);
  !set.has(activeEffect) && activeEffect && set.add(activeEffect);
};
```
