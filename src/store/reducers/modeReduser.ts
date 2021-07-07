const defaultState = {
  actionMode: false,
};

export const modeReduser = (state = defaultState, action) => {
  switch (action.type) {
    case 'isPlay':
      return {...state, actionMode: !state.actionMode};
    default:
      return state;
  }
};
