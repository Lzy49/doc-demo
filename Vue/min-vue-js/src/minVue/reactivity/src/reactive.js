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
