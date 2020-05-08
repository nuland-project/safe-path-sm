import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import reducer from './reducers';

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__,
});

function configureStore(initialState) {
  const middlewares = [loggerMiddleware];

  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(reducer, initialState, enhancer);

  return store;
}

export const store = configureStore({});
