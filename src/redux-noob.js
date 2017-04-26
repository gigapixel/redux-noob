import _ from 'lodash';
import { combineReducers, createStore } from 'redux';

export class Store {

  constructor(reducers) {
    this.store = createStore(combineReducers(reducers));
  }

  state() {
    return this.store.getState();
  }

  connect(callback) {
    return this.store.subscribe(callback);
  }

  emit(type, payload = {}) {
    this.store.dispatch({ type, payload });
  }

}

export class Reducer {

  constructor(initial) {
    this.actions = {};
    this.initial = initial;
  }

  on(type, reducer) {
    this.actions[type] = reducer;
  }

  create() {
    return (state, action) => {
      state = state || this.initial;
      let reducer = this.actions[action.type];
      return (reducer) ? reducer(_.cloneDeep(state), action) : state;
    };
  }

}
