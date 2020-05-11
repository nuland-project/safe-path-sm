import * as ActionTypes from './types';

// Actions concerning app navigation process
export const applicationActions = {
  setToken: token => ({
    type: ActionTypes.SET_TOKEN,
    payload: token,
  }),
  setUuid: uuid => ({
    type: ActionTypes.SET_UUID,
    payload: uuid,
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
