let activeEffect = null;
let reactiveMap = new WeakMap();
// 用于创建一个收集依赖的作用域。在该作用域中执行的函数都将收集依赖。
/**
 *
 * @param {function} fun 依赖函数。
 * @param {object} options 其他选项。lazy 懒惰，缓慢执行。scheduler 调度机，通知依赖使用。
 * @returns {function} effectFn 包裹 fun 的函数。
 */
export const effect = (fun, options = {}) => {
  const effectFn = () => {
    // 将作用域的函数收集到，然后执行并给所有响应值添加上。
    activeEffect = fun;
    activeEffect.scheduler = options.scheduler; // 调度时机,如果没有立即执行，可以被手动执行。
    try {
      return fun();
    } catch (res) {
      window.console.error('effect', res);
    }
    activeEffect = null;
  };
  !options.lazy && effectFn(); // 没有配置lazy 直接执行

  return effectFn;
};

// 通知依赖
export const trigger = (target, key) => {
  // set 执行
  const set = reactiveMap?.get(target)?.get(key);
  set &&
    set.forEach((effectFun) => {
      effectFun.scheduler ? effectFun.scheduler() : effectFun();
    });
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
