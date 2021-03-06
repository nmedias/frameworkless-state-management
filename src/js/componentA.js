/* eslint-disable no-console*/
import store from './store';
import { createComponent } from './component';

const component = options => {
  const { el } = options;

  return {
    el,
    render(state) {
      console.log('render A', store.state);

      if (el) {
        el.innerText = `ComponentA: ${JSON.stringify(state)}`;
      }
    },
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const componentA = options => {
  const c = createComponent(component(options));
  c.render(store.state);
  return c;
};
