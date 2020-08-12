/* eslint-disable no-console*/
import '../styles';

import store from './store';
import { componentA } from './componentA';
import { componentB } from './componentB';

const A = componentA({ id: 1, el: document.querySelector('#component-a') });
const B = componentB({ id: 2, el: document.querySelector('#component-b') });

console.log(A, B);

const addCount = () => {
  let count = 1;
  store.dispatch('setCount', count);
  return () => {
    count++;
    store.dispatch('setCount', count);
  };
};
const handler = () => {
  return () => {
    store.dispatch('setName', 'Manu');
  };
};

const buttonEl = document.querySelector('button');
const buttonEl2 = document.querySelector('button#button2');

buttonEl.addEventListener('click', addCount());
buttonEl2.addEventListener('click', handler());
