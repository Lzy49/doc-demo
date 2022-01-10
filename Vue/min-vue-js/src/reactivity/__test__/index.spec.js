import { reactive, effect } from '../index';
describe('reactive', () => {
  it('reactive 基本使用', () => {
    const store = reactive({
      num: 1
    });
    let value = 0;
    effect(() => {
      value = store.num + 1;
    });
    expect(value).toBe(1);
    store.num++;
    expect(value).toBe(2);
  });
});
