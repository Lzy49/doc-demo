import log, { fun } from './module.js';
import './assets/main.css';
import b from '../doc/webpck-应用篇.md';
const button = document.createElement('button');
button.innerText = '你好';
button.addEventListener('click', log);
document.body.append(button);
document.body.innerHTML = b;
const age = 20;
console.log(age, API_BASE_URL);
import(/* webpackChunkName: 'components1' */ './test').then((Module) => {
  console.log(Module.default.name);
});
