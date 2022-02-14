import './assign/index.css';
import './assign/index.scss';
// import IMG from './assign/img.jpg';
const el = document.getElementById('root');
el && (el.innerHTML = 'hello webpack5');
// const img = new Image();
// img.src = IMG;
// img.onload = function () {
//   el && el.append(img);
// };
const list = [1, 2, 3, 4];
console.log(list.includes(1));
let b = new Map([
  [1, '你好呀'],
  [2, '你坏呀']
]);

type b = {
  name: string;
  age: number;
};
let c: b = {
  name: '你好',
  age: 19
};
