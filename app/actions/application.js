import * as ActionTypes from './types';

// Actions concerning app navigation process
export const applicationActions = {
  setVerification: isVerified => ({
    type: ActionTypes.SET_VERIFICATION,
    payload: isVerified,
  }),
  setPhone: phone => ({
    type: ActionTypes.SET_PHONE,
    payload: phone,
  }),
  setStatus: status => ({
    type: ActionTypes.SET_STATUS,
    payload: status,
  }),
};
