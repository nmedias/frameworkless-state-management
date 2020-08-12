import Store from './storeLib/store';

const store = {
  state: {
    count: 1,
    name: '',
  },
  actions: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    setCount({ commit }, count) {
      commit('setCount', count);
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    setName({ commit, state }, name) {
      commit('setName', name);
    },
  },
  mutations: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    setCount(state, count) {
      state.count = count;
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    setName(state, name) {
      state.name = name;
    },
  },
};

export default Store(store);
