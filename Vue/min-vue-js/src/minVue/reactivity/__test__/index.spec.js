import { reactive, effect, ref, isRef } from '../index';
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
describe('isRef', () => {
  test('isRef 基本值', () => {
    const v = ref(10);
    expect(isRef(v)).toBe(true);
    expect(isRef('123')).toBe(false);
  });
  test('isRef 引用值', () => {
    const v = ref({ age: 10 });
    expect(isRef(v)).toBe(true);
  });
});
describe('ref', () => {
  test('ref 基本值', () => {
    const num = ref(10);
    let result = 0;
    effect(() => {
      result = num.value + 100;
    });
    expect(result).toBe(110);
    num.value = 101;
    expect(result).toBe(201);
  });
  test('ref 引用值', () => {
    const user = ref({
      age: 19,
      name: '刘谋'
    });
    let userInfo = '';
    effect(() => {
      userInfo = `姓名：${user.value.name}，年纪${user.value.age}`;
    });
    expect(userInfo).toBe(`姓名：刘谋，年纪19`);
    user.value.age = 20;
    expect(userInfo).toBe(`姓名：刘谋，年纪20`);
  });
});
