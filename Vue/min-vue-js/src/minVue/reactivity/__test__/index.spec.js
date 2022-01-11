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
});
