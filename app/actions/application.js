import * as ActionTypes from './types';

// Actions concerning app navigation process 
export const applicationActions = {
  screenPush: (screen, params={}) => ({
    type: ActionTypes.SCREEN_PUSH,
    screen,
    params
  }),
  screenPop: () => ({
    type: ActionTypes.SCREEN_POP
  }),
  screenPopPush: (screen, params={}) => ({
    type: ActionTypes.SCREEN_POP_PUSH,
    screen,
    params
  }),
  changeAppSection: (newSection) => ({
    type: ActionTypes.CHANGE_APP_SECTION,
    newSection
  })
}
