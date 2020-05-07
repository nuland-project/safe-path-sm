import { combineReducers } from 'redux';

import * as applicationReducers from './application';

const appReducer = combineReducers(Object.assign(applicationReducers));

export default appReducer;
