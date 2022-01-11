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
