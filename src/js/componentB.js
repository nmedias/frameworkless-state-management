/* eslint-disable no-console*/
import { createComponent } from './component';
import store from './store';

const component = options => {
  const { el } = options;
  return {
    el,
    render(state) {
      console.log('render B', store.state);
      if (el) {
        el.innerText = `ComponentB: ${JSON.stringify(state)}`;
      }
    },
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const componentB = options => {
  const c = createComponent(component(options));
  c.render(store.state);
  return c;
};
