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
