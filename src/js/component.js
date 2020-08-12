/* eslint-disable no-console*/
import store from './store';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-empty-function
export function Component(el, render = () => {}) {
  store.subscribe('stateChange', render);
  return {
    info() {
      return 'From Master Component';
    },
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createComponent = component => {
  const { el, render } = component;
  const parent = Component(el, render.bind(component));

  return Object.freeze(Object.assign({}, parent, component));
};
