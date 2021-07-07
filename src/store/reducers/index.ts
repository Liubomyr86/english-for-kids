import {combineReducers} from 'redux';
import {categoryCardsReducer} from './categoryCardsReducer';
import {modeReduser} from './modeReduser';

export const rootReducer = combineReducers({
  mode: modeReduser,
  category: categoryCardsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
