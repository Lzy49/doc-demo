import { effect, trigger, track } from './effect';
// 我要理解 computed 是怎么运行的。
export const computed = (getterOroption) => {
  let getter, setter;
  if (typeof getterOroption === 'function') {
    getter = getterOroption;
    setter = () => console.warn('computed 没有定义 setter');
  } else {
    getter = getterOroption.get;
    setter = getterOroption.set;
  }
  return new ComputedRefImpl(getter, setter);
};
class ComputedRefImpl {
  constructor(getter, setter) {
    this._val = null; // 值
    this._dirty = true; // 值 与 getter 运行的结果不符时 设为 true
    // getter 会得到一个值 ，这个值是 computed 的值
    this.getter = effect(
      () => {
        this._val = getter();
      },
      {
        lazy: true,
        scheduler: () => {
          if ((this._dirty === false)) {
            this._dirty = true;
            trigger(this, 'value');
          }
        }
      }
    );
    this.setter = setter;
  }
  set value(v){
    return this.setter(v)
  }
  get value() {
    // 这里不能每次都获取值，这样的话就没有缓存机制了。应该是数据发生改变后，获取。
    track(this, 'value')
    if (this._dirty === true) {
      this._dirty = false;
      this.getter();
    }
    return this._val;
  }
}
