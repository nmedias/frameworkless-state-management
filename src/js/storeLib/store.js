import * as lib from './lib';

const Store = store => {
  const events = {};
  const subscribe = lib.subscribe(events);
  const publish = lib.publish(events);

  const state = new Proxy(store.state || {}, {
    set(target, p, value) {
      const oldValue = target[p];
      target[p] = value;

      if (JSON.stringify(oldValue) !== JSON.stringify(value)) {
        // eslint-disable-next-line no-console
        //console.log(`stateChange: ${p}: ${JSON.stringify(value)}`);

        //trigger publish, run callback
        publish('stateChange', state);
      }

      //indicate success
      return true;
    },
  });

  return {
    get state() {
      //prevent reassigning and extending state.store[prop] directly
      return Object.freeze({ ...store.state });
    },
    publish,
    subscribe,
    commit(mutationKey, payload) {
      return lib.commit(store)(state)(mutationKey, payload);
    },
    dispatch(actionKey, payload) {
      return lib.dispatch(store)(this)(actionKey, payload);
    },
  };
};

export default Store;
