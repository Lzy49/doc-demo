import { reactive } from './reactive';
import { track, trigger } from './effect';
import { isObject } from '../../shared';
const ISREF = '__v_isRef';
// 创建 ref
export const ref = (target) => {
  /**
   * - 判断值 合法
   * - 创建 ref 值
   */
  return isRef(target) ? target : new Ref(target);
};
export const isRef = (target) => Boolean(target && target[ISREF]);

// 处理 值为 reactive
const convert = (value) => (isObject(value) ? reactive(value) : value);

// ref 类
class Ref {
  constructor(val) {
    this[ISREF] = true;
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
