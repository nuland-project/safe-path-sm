import * as ActionTypes from '../../actions/types';
import createReducer from '../../utils/createReducer';

// Initial state
const initialState = {
  boxExists: false,
  isAuth: false,
  keyPair: {},
  balance: 100,
  karma: 50,
  userName: '',
  avatar: '',
  background: '',
  userDescription: '',
};

// Actions processed by identity store are listed below
export const identity = createReducer(initialState, {
  // Sign in application
  [ActionTypes.LOG_IN](state, action) {
    return Object.assign({}, state, {
      isAuth: true,
      keyPair: action.keyPair,
    });
  },
  // Sign Out application
  [ActionTypes.LOG_OUT](state, action) {
    return Object.assign({}, state, {
      isAuth: false,
      keyPair: {},
    });
  },
  [ActionTypes.UPD_BOX_FLAG](state, action) {
    return Object.assign({}, state, {
      boxExists: action.boxExists,
    });
  },
  // Set user info in profile
  [ActionTypes.UPD_USER_DATA](state, action) {
    return Object.assign({}, state, {
      ...action.payload,
    });
  },
  // Update balance
  [ActionTypes.BALANCE_UPD](state, action) {
    return Object.assign({}, state, {
      balance: action.payload,
    });
  },
  // Increment/decrement of karma
  [ActionTypes.KARMA_CHANGE](state, action) {
    // Compute new value of karma
    let newKarma = state.karma + action.payload;
    if (newKarma < 0) newKarma = 0;

    // Update store
    let newState = JSON.parse(JSON.stringify(state));
    newState.karma = newKarma;
    return newState;
  },
});
