/**
 * @desc 防抖
 * @param {function} fun 函数
 * @param {number} delay 延迟时间
 * @param {Boolean} immed true 表立即执行，false 表非立即执行
 */
export default function (fun, delay = 0, immed = true) {
  const context = this;
  let now = 0;
  if (immed) {
    return (...ags) => {
      let n = new Date().getTime();
      if (n - now < delay) {
        return;
      }
      now = n;
      return fun.apply(context, ags);
    };
  } else {
    return (...ags) => {
      let timeout = null;
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        fun.apply(context, ags);
      }, delay);
    };
  }
}
