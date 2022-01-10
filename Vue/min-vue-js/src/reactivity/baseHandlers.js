const get = createGetter();
const set = createSetter();
import { reactive } from './reactive';
function createGetter(shallow = false) {
  // 在 get 中 收集依赖，方便通知
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    track(target, 'get', key);
    if (isObject(res)) {
      // 值也是对象的话，需要嵌套调用 reactive;
      // res就是 target[key];
      // 浅层代理，不需要嵌套
      return shallow ? res : reactive(res);
    }
    return res;
  };
}
function createSetter(shallow = false) {
  // 在 set 中 通知依赖，更新
}
export const mutableHandlers = {
  get,
  set
};
