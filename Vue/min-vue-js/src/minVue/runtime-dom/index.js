import { createRenderer } from '../runtime-core';
import { isFunction, isString } from '../shared';
import { patchProp } from './patchProp';
import { nodeOps } from './nodeOps';
// 创建一个 app应用
export const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  const { mount } = app;
  // 如果 mount 绑入的 `dom` 不是 DOM ，则不管
  app.mount = (containerOrSelector) => {
    // 获取DOM
    const container = normalizeContainer(containerOrSelector);
    if (container) return;
    // 获取传入 Component
    const component = app._component;
    // 传入内容不是 Vue Component 就渲染个寂寞
    if (!isFunction && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = '';
    const proxy = mount(container, false, container instanceof SVGElement);

    // vue 小心思
    // 当 vue 没有渲染出来的时候可以使用 css [v-cloak] 来定义 css ，
    // 而当 vue 组件加载成功后可使用 css [data-v-app] 来定义 css
    if (container instanceof Element) {
      container.removeAttribute('v-cloak');
      container.setAttribute('data-v-app', '');
    }
    return proxy;
  };
  return app;
};

// 转换 'css selectors' 为 DOM
function normalizeContainer(container) {
  return isString(container) ? document.querySelector(container) : container;
}
// 创建解析器。

// 懒惰函数对渲染器进行缓存。
let renderer = null;
function ensureRenderer() {
  // nodeOps, patchProp 是渲染器的渲染项。要在  createRenderer 对这些配置项进行调用。
  return renderer || (renderer = createRenderer({ ...nodeOps, patchProp }));
}
