import * as ActionTypes from '../../actions/types';
import createReducer from '../../utils/createReducer';

const AppSections = 'temp1';
const Screens = 'temp2';

const cloneDeep = require('lodash/cloneDeep');

// Initial state
const initialState = {
  // Active application section. This variable represents what screens stack we need to use:
  // 'FEED_SECTION', 'PROFILE_SECTION' etc
  appSection: AppSections.FEED_SECTION,

  // This objects consists of navigation stacks (one stack for each application section)
  navStacks: {
    FEED_SECTION: [
      {
        screen: Screens.FEED_SCREEN,
        params: {},
      },
    ],
    PROFILE_SECTION: [
      {
        screen: Screens.PROFILE_SCREEN,
        params: {},
      },
    ],
  },
};

export const application = createReducer(initialState, {
  // Sign Out application
  [ActionTypes.LOG_OUT](state, action) {
    return cloneDeep(initialState);
  },

  // Add new screen name in appropriate array
  [ActionTypes.SCREEN_PUSH](state, action) {
    // Deep copy of state
    let newState = cloneDeep(state);

    // Apply state changes
    newState.navStacks[newState.appSection].push({
      screen: action.screen,
      params: cloneDeep(action.params),
    });

    // Update store
    return newState;
  },

  // Remove top screen from the stake
  [ActionTypes.SCREEN_POP](state) {
    // Deep copy of state
    let newState = cloneDeep(state);

    // Apply state changes
    newState.navStacks[newState.appSection].pop();

    // Update store
    return newState;
  },

  // Replace last screen by new one
  [ActionTypes.SCREEN_POP_PUSH](state, action) {
    // Deep copy of state
    let newState = cloneDeep(state);

    // Apply state changes
    const length = newState.navStacks[newState.appSection].length;
    newState.navStacks[newState.appSection][length - 1] = {
      screen: action.screen,
      params: cloneDeep(action.params),
    };

    // Update store
    return newState;
  },

  // Change main screen index when swipe action was triggered
  [ActionTypes.CHANGE_APP_SECTION](state, action) {
    // Apply state changes
    const newState = { ...state, ...{ appSection: action.newSection } };

    // Then update store
    return newState;
  },
});
