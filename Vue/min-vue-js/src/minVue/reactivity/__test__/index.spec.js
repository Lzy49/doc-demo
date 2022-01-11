import { reactive, effect } from '../index';
describe('reactive', () => {
  it('reactive 基本使用', () => {
    const store = reactive({
      num: 1,
      num2: 2
    });
    let value = 0;
    effect(() => {
      value = store.num + 1;
    });
    expect(value).toBe(2);
    store.num++;
    expect(value).toBe(3);
    store.num2 = 100;
    expect(store.num2).toBe(100);
  });
  it('reactive 双 effect 测试', () => {
    const ret = reactive({
      num: 0
    });
    let val;
    let val2;
    effect(() => {
      val = ret.num;
    });
    effect(() => {
      val2 = ret.num;
    });
    expect(val).toBe(0);
    expect(val2).toBe(0);
  });
});
