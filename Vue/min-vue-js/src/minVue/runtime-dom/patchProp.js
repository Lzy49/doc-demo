function patchClass(el, value) {
  if (value == null) {
    el.removeAttribute('class');
  } else if (isSVG) {
    el.setAttribute('class', value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  if (!next) {
    el.removeAttribute('style');
  }
  for (const key in next) {
    el.style[key] = next[key];
  }
  if (prev && !isString(prev)) {
    for (const key in prev) {
      if (next[key] == null) {
        el.style[key] = '';
      }
    }
  }
}
export function patchProp(el, key, prev, next) {
  // 其实要处理的内容很多
  if (key === 'class') {
    patchClass(el, next); //class
  } else if (key === 'style') {
    patchStyle(el, prev, next); //style
  } else if (isOn(key)) {
    const invokers = el._events || (el._events = {});
    const existingInvoker = invokers[key];
    if (next && existingInvoker) {
      existingInvoker.value = next;
    } else {
      const eventName = key.slice(2).toLowerCase();
      if (next) {
        const invoker = (invokers[key] = next);
        el.addEventListener(eventName, invoker);
      } else {
        el.removeEventListener(eventName, existingInvoker);
        invokers[key] = undefined;
      }
    }
  } else {
    if (next === null || next === '') {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, next);
    }
  }
}
