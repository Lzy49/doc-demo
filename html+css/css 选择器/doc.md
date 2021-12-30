# 选择器分类

## 通配符选择器

`*` 选择器，表示所有选择器

```css
* {
}
```

## 元素（标签）选择器

`p` 元素（标签）选择器

```css
p {
}
```

## 类选择器

`.` 选择 标签 `class` 名

```css
.warning {
  color: red;
}
```

## id 选择器

`#` 选择 标签 `id` 名

```css
#warning {
  color: red;
}
```

## 属性选择器

`[]` 选择 标签上固定的 某属性 = 某些值。

```css
[foo] {
  /* 选择 带有 foo 的 标签 */
  background-color: red;
}
[foo='abc'] {
  /* 选择 带有 foo='abc' 的 标签 */
  background-color: red;
}
```

除了固定的某属性还有其他通配符

- `a~=b` 选择 `a = 'b'` or `a = 'b c'` 不能选中 `a = 'bc'`

- `a|=b` 选择 `a='b'` or `a='b-d` 不能选中 `a=bd`
- `a^=b` 选择 `a`=以`b`开头

- `a$=b` 选择 `a`以`b`结尾

- `a*=b` 选择 `a`包含`b`

```css
/* 属性选择器 */
[data-id='abc'] {
  /* 匹配 data-id='abc' */
  color: red;
}
[data-id~='abc'] {
  /* 匹配 data-id='abc' or data-id="abc d" */
  background: orange;
}
[data-id^='a'] {
  /* 匹配 data-id='a*' */
  box-shadow: 5px 5px 5px #000;
}
[data-id|='abc'] {
  /* 匹配 data-id='abc' 或 data-id='abc-**'*/
  border: 4px solid blue;
}
[data-id$='f'] {
  /* 匹配 data-id="**f" */
  background: red;
}
[data-id*='c'] {
  /* 匹配 data-id="**c**" */
  text-shadow: 5px 5px 5px green;
}
```

## 文档结构选择器

### 后代选择器

两个 选择器 用 ` ` 分割

### 子选择器

两个 选择器 用 `>` 分割

### 相邻的后面第一个

两个 选择器 用 `+` 分割

### 相邻的后面所有兄弟选择器

两个 选择器 用 `~` 分割

```css
ul div {
  /* 选择所有后代 div */
  background: red;
}
ul > li:first-child > div {
  /* 选择ul的第一个子li的所有子div */
  background: green;
}
.li1 ~ li {
  /* 选择.li1 后面的所有 同级 li  */
  color: pink;
}
.li1 + li {
  /* 选择 .li1 后的第一个同级 li */
  color: purple;
}
```

## 伪类选择器

### :root

- 文档根元素伪类,一般用来定义 全局变量。
- 一般定义 变量。

```css
:root {
  --blue: #blue;
}
```

### 子选择器

#### 无论是什么元素

- `:nth-child(n)` 第几个子选择器
- `:first-child` 第一个子元素
- `:last-child` 最后一个子元素

```css
/* 子选择器 不区分元素类型 */
.container div:first-child {
  background: rgb(255, 0, 255);
}
.container div:nth-child(2) {
  background: rgb(255, 100, 255);
}
.container div:last-child {
  background: rgb(255, 200, 255);
}
```

#### 同类型

- `element:nth-of-type(n)` element 类型的第 n 个元素
- `element:nth-last-of-type(n)` element 类型的倒数第 n 个子元素
- `element:first-of-type` 第一个 element 子元素
- `element:last-of-type` 最后一个 element 子元素

```css
/* 子选择器 区分元素类型 */
.container p:first-of-type {
  background: rgba(0, 255, 255, 1);
}
.container p:nth-of-type(2) {
  background: rgba(0, 255, 255, 0.8);
}
.container p:nth-last-of-type(2) {
  background: rgba(0, 255, 255, 0.6);
}
.container p:last-of-type {
  background: rgba(0, 255, 255, 0.4);
}
```

#### 唯一子元素

- `:only-child` 选择了父元素 唯一的子元素
- `:only-of-type` 父元素里唯一同类型子元素

```css
.container2 > div > p:only-of-type {
  /** 匹配到同级没有其他 p 的 p 元素 */
  color: blue;
}
.container2 > div > p:only-child {
  /** 匹配到同级没有其他 元素 的 p 元素 */
  color: purple;
}
```

#### 没有子元素

- `:empty` 选中没有子元素的元素

```css
.container2 > div > p:empty {
  /** 匹配到没有任何子元素包括 text 的 p */
  background: #000;
}
```

### state 状态选择器

- `a:link` 没有访问过的状态
- `a:active` 链接正在被点击
- `a:hover` 选择鼠标指针位于其上的链接。
- `a:visited` 选择所有已被访问的链接。

```css
a:visited {
  /* 访问过 */
  color: gray;
}
a:link {
  /* 未被访问过 */
  color: red;
}
a:hover {
  /* 鼠标移入 */
  color: blue;
}
a:active {
  /* 鼠标点击 */
  color: orange;
}
```

### input

- `:focus` 选择器用于选取获得焦点的元素。
- `:enabled / :disabled` 选择每个启用的 input 元素 / 选择每个禁用的 input 元素
- `:checked` 选择每个被选中的 input 元素。自定义开关可以用这个实现

```css
input:focus {
  background: green;
}
input:disabled {
  background: blue;
}
input:checked {
  transform: scale(2, 2);
}
```

### 非选择器

`:not(selector)` 选择非 selector 元素的每个元素。（反向选择）

## 伪元素选择器

- `element::first-line` 元素的第一行发生改变 只能在 块级元素上使用
- `element::first-letter` 元素内容的第一个字符 只能在 块级元素上使用
- `element::before` 在每个 element 元素的内容之前插入内容。
- `element::after` 在每个 element 元素的内容之后插入内容。
- `::selection` 选择被用户选取的元素部分

```css
span {
  display: block;
}
.text-box > span::first-line {
  color: red;
}
.text-box > span::first-letter {
  color: green;
}
.text-box::before {
  content: '';
  display: block;
  height: 10px;
  width: 10px;
  background: red;
}
.text-box::after {
  content: '';
  display: block;
  height: 10px;
  width: 10px;
  background: green;
}
.text-box > span::selection {
  color: gold;
}
```
# 优先级
!important>行内样式>ID选择器>类、伪类、属性>元素、伪元素>继承>通配符