/**
 * Runs callbacks from the event collection
 */
const publish = events => (event, payload) => {
  if (!events.hasOwnProperty(event)) {
    // eslint-disable-next-line no-console
    //console.error(`There are no subscriptions for this event: ${event}`);
    return [];
  }
  return events[event].map(callback => callback(payload));
};

/**
 * Pushes callback to events collection
 */
const subscribe = events => (event, callback) => {
  if (!events.hasOwnProperty(event)) {
    events[event] = [];
  }
  return events[event].push(callback);
};

/**
 * Look for a mutation and runs the mutation (modification of the state object)
 */
const commit = store => state => (mutationKey, payload) => {
  if (
    !store.mutations.hasOwnProperty(mutationKey) &&
    typeof store.mutations[mutationKey] !== 'function'
  ) {
    // eslint-disable-next-line no-console
    console.error(
      `${mutationKey} mution doesn't exist in mutations collection or is not a function.`
    );
    return false;
  }

  store.mutations[mutationKey](state, payload);
  return true;
};

/**
 * A dispatcher for actions that looks for an action and runs the action
 */
const dispatch = store => context => (actionKey, payload) => {
  if (
    !store.actions.hasOwnProperty(actionKey) &&
    typeof store.actions[actionKey] !== 'function'
  ) {
    // eslint-disable-next-line no-console
    console.error(
      `${actionKey} action doesn't exist in actions collection or is not a function.`
    );

    return false;
  }
  store.actions[actionKey](context, payload);

  return true;
};

export { publish, subscribe, commit, dispatch };
