import IMG0 from './assets/IMG0.jpg';
import './assets/module.css';

export const fun = ()=>{
  console.log('做好事情就回来')
}
const img = new Image();
img.src = IMG0;
img.onload = (e) => {
  document.body.append(img);
};
export default () => {
  console.log('你好');
};

const testEs6 = new Proxy(
  {
    age: 10
  },
  {
    set(target, key, value) {
      Reflect.set(target, key, value);
      console.log(key, value);
      return value;
    }
  }
);

const button = document.createElement('button');
button.addEventListener('click', () => {
  testEs6.age = 123;
  console.log(testEs6);
});

document.body.append(button);
