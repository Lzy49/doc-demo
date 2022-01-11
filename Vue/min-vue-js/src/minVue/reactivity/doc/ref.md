# ref 的实现

有了 reactive 的基础，实现 ref 非常容易。

- 定义一个类，该类有一个值`value`
- 在 `get value` 中 收集依赖。
- 在 `set value` 中 通知依赖。

# 具体代码 ref.js

```JavaScript
import { reactive } from './reactive';
import { track, trigger } from './effect';
import { isObject } from '../../shared';
// 创建 ref
export const ref = (target) => {
  /**
   * - 判断值 合法
   * - 创建 ref 值
   */
  return isRef(target) ? target : new Ref(target);
};
export const isRef = (target) => Boolean(target && target.__isRef);

// 处理 值为 reactive
const convert = (value) => (isObject(value) ? reactive(value) : value);

// ref 类
class Ref {
  constructor(val) {
    this.__isRef = true;
    this._val = convert(val);
  }
  get value() {
    track(this, 'value');
    return this._val;
  }
  set value(val) {
    this._val = convert(val);
    trigger(this, 'value');
    return this._val;
  }
}

```
