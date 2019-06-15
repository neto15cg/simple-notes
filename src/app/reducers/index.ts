import { combineReducers, Reducer } from 'redux';
import { RootState } from 'app/reducers/state';
import { Reducer as noteReducer } from 'app/ducks/note';

export { RootState };

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  note: noteReducer,
});
