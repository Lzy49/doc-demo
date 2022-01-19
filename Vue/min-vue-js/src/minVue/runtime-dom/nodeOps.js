// 关于 DOM 的操作
export const nodeOps = {
  // 插入DOM
  insert(child, parent, anchor) {
    parent.insertBefore(child, anchor || null);
  },
  // 删除 DOM
  remove(child) {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  // 创建 DOM
  createElement(type) {
    return document.createElement(type);
  },
  // 创建 文字 DOM
  createText(text) {
    return document.createTextNode(text);
  },
  // 为 DOM 修改HTML
  setText(node, text) {
    node.nodeValue = text;
  },
  // 为 DOM 修改文字
  setElementText(el, text) {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, '');
  }
};
