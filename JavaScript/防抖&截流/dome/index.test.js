import debounce from './debounce';
import throttle from './throttle';
describe('debounce', () => {
  test('多次促发只会执行最后一次', () => {
    let value = 0;
    const fun = debounce(
      function (v = 10) {
        value = v;
      },
      1000,
      false
    );
    fun(10);
    fun(11);
    fun(12);
    fun(13);
    setTimeout(() => {
      expect(value).toBe(13);
    }, 1400);
  });
  test('多次触发只会执行第一次', () => {
    const fun = debounce(function (v) {
      expect(v).toBe(1);
    }, 1000);
    fun(1);
    fun(2);
    fun(3);
    fun(4);
    fun(5);
  });
  test('多次触发只会执行第一次 this', () => {
    const obj = {
      num: 0
    };
    const fun = debounce.call(
      obj,
      function (v) {
        this.num = v;
      },
      1000
    );
    fun(1);
    fun(2);
    fun(3);
    fun(4);
    fun(5);
    setTimeout(() => {
      expect(obj.num).toBe(1);
    }, 1000);
  });

  test('多次触发只会执行最后一次 this', () => {
    const obj = {
      num: 0
    };
    const fun = debounce.call(
      obj,
      function (v) {
        this.num = v;
      },
      1000,
      false
    );
    fun(1);
    fun(2);
    fun(3);
    fun(4);
    fun(5);
    setTimeout(() => {
      expect(obj.num).toBe(5);
    }, 1000);
  });
});

describe('throttle', () => {
  test('设置间隔为100毫秒，点击1秒只触发10次', () => {
    let n = 0;
    const fun = throttle((value) => {
      n += value;
    }, 100);
    const Interval = setInterval(() => {
      fun(2);
    }, 10);
    setTimeout(() => {
      clearTimeout(Interval);
      expect(n).toBe(20);
    }, 1000);
  });
  test('设置间隔为100毫秒，间隔后执行，点击990毫秒内只触发9次', () => {
    let n = 0;
    const fun = throttle(
      (value) => {
        n += value;
      },
      100,
      false
    );
    const Interval = setInterval(() => {
      fun(1);
    }, 10);
    setTimeout(() => {
      clearTimeout(Interval);
      expect(n).toBe(9);
    }, 990);
  });
  test('立即执行 this 测试', () => {
    const obj = {
      v: 0
    };
    obj.sum = throttle.call(
      obj,
      (value) => {
        obj.v += value;
      },
      100,
      true
    );
    const Interval = setInterval(() => {
      obj.sum(1);
    }, 10);
    setTimeout(() => {
      clearTimeout(Interval);
      expect(obj.v).toBe(10);
    }, 990);
  });
  test('延迟执行 this 测试', () => {
    const obj = {
      v: 0
    };
    obj.sum = throttle.call(
      obj,
      (value) => {
        obj.v += value;
      },
      100,
      false
    );
    const Interval = setInterval(() => {
      obj.sum(1);
    }, 10);
    setTimeout(() => {
      clearTimeout(Interval);
      expect(obj.v).toBe(9);
    }, 990);
  });
});
