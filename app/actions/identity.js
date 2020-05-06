import * as ActionTypes from './types';

// Actions concerning app navigation process
export const identityActions = {
  logIn: keyPair => ({
    type: ActionTypes.LOG_IN,
    keyPair,
  }),
  logOut: () => ({
    type: ActionTypes.LOG_OUT,
  }),
  deleteAccount: () => ({
    type: ActionTypes.DELETE_ACCOUNT,
  }),
  updBoxFlag: boxExists => ({
    type: ActionTypes.UPD_BOX_FLAG,
    boxExists,
  }),
  updUserData: payload => ({
    type: ActionTypes.UPD_USER_DATA,
    payload,
  }),
  changeKarma: delta => ({
    type: ActionTypes.KARMA_CHANGE,
    payload: delta,
  }),
  updateBalance: newBalance => ({
    type: ActionTypes.BALANCE_UPD,
    payload: newBalance,
  }),
};
