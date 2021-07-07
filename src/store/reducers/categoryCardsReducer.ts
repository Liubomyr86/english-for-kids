const defaultState = {
  playCategory: [],
};

export const categoryCardsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return {...state, playCategory: [action.payload]};
    default:
      return state;
  }
};
