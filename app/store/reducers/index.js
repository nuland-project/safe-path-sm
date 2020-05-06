import { combineReducers } from 'redux';

import * as applicationReducers from './application';
import * as identityReducers from './identity';

const appReducer = combineReducers(
  Object.assign(identityReducers, applicationReducers),
);

export default appReducer;
