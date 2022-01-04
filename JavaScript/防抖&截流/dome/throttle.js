/**
 * @desc 函数节流
 * @param {function} fun 函数
 * @param {number} interval 间隔
 * @param {boolean} immed true 表立即执行，false 表非立即执行
 */
export default (fun, interval = 100, immed = true) => {
  const context = this;
  if (immed) {
    let now = 0;
    return (...ags) => {
      const n = new Date().getTime();
      if (n - now > interval) {
        fun.apply(context, ags);
        now = n;
      }
    };
  } else {
    let can = true;
    return (...ags) => {
      if (!can) return;
      can = false;
      setTimeout(() => {
        fun.apply(context, ags);
        can = true;
      }, interval);
    };
  }
};
