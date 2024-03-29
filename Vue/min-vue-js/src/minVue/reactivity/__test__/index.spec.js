import { reactive, effect, isRef, ref, computed } from '../index';
// import {ref} from 'vue'
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

describe('computed', () => {
  test('computed get', () => {
    let v1 = ref(10);
    let v2 = ref(11);
    const value = computed(() => {
      return v1.value + v2.value;
    });
    function a() {
      v1.value++;
      v2.value++;
    }
    expect(value.value).toBe(21);
    a();
    expect(value.value).toBe(23);
    a();
    expect(value.value).toBe(25);
  });
  test('computed get 未调用不执行 effect', () => {
    let v1 = ref(10);
    let v2 = ref(11);
    let v = 0;
    const value = computed(() => {
      v++;
      return v1.value + v2.value;
    });
    expect(v).toBe(0);
  });
  test('computed get 两个值 只会执行一次 effect', () => {
    let v1 = ref(1);
    let v2 = ref(1);
    let count = 0;
    let v3 = computed(() => {
      count++;
      return v1.value + v2.value;
    });
    expect(v3.value).toBe(2);
    expect(count).toBe(1);
    v1.value = 2;
    v2.value = 2;
    expect(v3.value).toBe(4);
    expect(count).toBe(2);
  });
  test('computed set', () => {
    let v1 = ref(10);
    let v2 = ref(11);
    const value = computed({
      get() {
        return v1.value + v2.value;
      },
      set(val) {
        v1.value = val - v2.value;
      }
    });
    expect(value.value).toBe(21);
    value.value = 11;
    expect(v1.value).toBe(0);
  });
  test('测试 computed 依赖改变后，computed 值不被调用时不做修改', () => {
    const v1 = ref(1);
    const v2 = computed(() => v1.value);
    v1.value = 2;
    v1.value = 3;
    expect(v2.value).toBe(3);
  });
  test('computed 作为 依赖', () => {
    const v1 = ref(1);
    const v2 = computed(() => {
      return v1.value + 1;
    });
    const v3 = computed(() => {
      return 'v3-' + v2.value;
    });
    expect(v2.value).toBe(2);
    v1.value = 2;
    expect(v3.value).toBe('v3-3');
    v1.value = 3;
    expect(v3.value).toBe('v3-4');
  });
  test('computed 依赖 computed', () => {
    const v1 = ref(1);
    const v2 = computed(() => v1.value);
    const v3 = computed(() => v2.value);
    expect(v3.value).toBe(1);
    v1.value = 2;
    expect(v3.value).toBe(2);
  });
  test('computed 依赖 computed 2 个 值', () => {
    let v1 = ref(1);
    let v2 = ref(1);
    const v3 = computed(() => v1.value + 1);
    const v4 = computed(() => v2.value + v1.value);
    const v5 = computed(() => v3.value + v4.value);
    expect(v5.value).toBe(4);
    v2.value = 2;
    v1.value = 2;
    expect(v5.value).toBe(7);
  });
});
