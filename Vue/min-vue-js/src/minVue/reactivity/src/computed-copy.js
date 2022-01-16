import { trigger, track, effect } from './effect';
// computed
export const computed = (option) => {
  let getter, setter;
  if (typeof option === 'function') {
    getter = option;
  } else {
    getter = option.get;
    setter = option.set;
  }
  return new ComputedRefImpl(getter, setter);
};

class ComputedRefImpl {
  constructor(getter, setter) {
    this._value = null;
    this._setter = setter;
    this._dirty = true;
    /**
     * 因为值在未被调用之前不会执行，所以需要将 依赖缓存起来，等到 get 时再执行。
     */
    this.effect = effect(
      () => {
        this._value = getter();
      },
      {
        lazy: true,
        scheduler: () => {
          console.log('调用', this._value);
          // 多处使用 computed 值，值只会在数据全部更改后才会执行。
          if (!this._dirty) {
            this._dirty = true;
            trigger(this, 'value');
          }
        }
      }
    );
  }
  get value() {
    if (this._dirty) {
      this._dirty = false;
      this.effect();
    }
    track(this, 'value', this._value);
    return this._value;
  }
  set value(val = null) {
    return this._setter(val);
  }
}






