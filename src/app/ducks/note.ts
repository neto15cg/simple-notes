import createReducer from 'app/util/createReducer';
import { createSelector } from 'reselect';
import Immutable from 'immutable';
import Moment from 'moment';
Moment.locale('pt-br');

export interface Tag {
  id: string;
  tag: string;
}

export interface Note {
  id: string;
  note: string;
  tags: Array<Tag>;
  createdAt: string;
}

export enum ActionTypes {
  CreateStart = 'note.CreateStart',
  CreateSuccess = 'note.CreateSuccess',
  CreateError = 'note.CreateError',
  UpdateStart = 'note.UpdateStart',
  UpdateSuccess = 'note.UpdateSuccess',
  UpdateError = 'note.UpdateError',
  ListStart = 'note.ListStart',
  ListSuccess = 'note.ListSuccess',
  ListError = 'note.ListError',
  GetStart = 'note.GetStart',
  GetSuccess = 'note.GetSuccess',
  GetError = 'note.GetError',
  DeleteStart = 'note.DeleteStart',
  DeleteSuccess = 'note.DeleteSuccess',
  DeleteError = 'note.DeleteError',
}

export type Actions = {
  CreateStart: { type: ActionTypes.CreateStart };
  CreateSuccess: { type: ActionTypes.CreateSuccess; payload: Note };
  CreateError: { type: ActionTypes.CreateError; payload: Error };
  UpdateStart: { type: ActionTypes.UpdateStart };
  UpdateSuccess: { type: ActionTypes.UpdateSuccess; payload: Note };
  UpdateError: { type: ActionTypes.UpdateError; payload: Error };
  ListStart: { type: ActionTypes.ListStart };
  ListSuccess: { type: ActionTypes.ListSuccess; payload: Array<Note> };
  ListError: { type: ActionTypes.ListError; payload: Error };
  GetStart: { type: ActionTypes.GetStart };
  GetSuccess: { type: ActionTypes.GetSuccess; payload: Note };
  GetError: { type: ActionTypes.GetError; payload: Error };
  DeleteStart: { type: ActionTypes.DeleteStart };
  DeleteSuccess: { type: ActionTypes.DeleteSuccess; payload: Note };
  DeleteError: { type: ActionTypes.DeleteError; payload: Error };
};

export type LoadingSections = {
  'note.basic': boolean;
};

// Reducers
const initialState = Immutable.Map<'note', any>({
  loading: Immutable.Map({
    'note.create': false,
    'note.update': false,
    'note.list': false,
    'note.get': false,
    'note.delete': false,
  }),
  error: undefined,
  notes: [] as Array<Note>,
  note: undefined,
});

export const Reducer = createReducer(initialState, {
  [ActionTypes.CreateStart](state: Immutable.Map<string, any>, a: Actions['CreateStart']) {
    state = state.setIn(['loading', 'note.create'], true);
    return state;
  },
  [ActionTypes.CreateSuccess](state: Immutable.Map<string, any>, a: Actions['CreateSuccess']) {
    state = state.set('note', a.payload);
    state = state.setIn(['loading', 'note.create'], false);
    return state;
  },
  [ActionTypes.CreateError](state: Immutable.Map<string, any>, a: Actions['CreateError']) {
    state = state.set('error', a.payload);
    state = state.setIn(['loading', 'note.create'], false);
    return state;
  },
  [ActionTypes.UpdateStart](state: Immutable.Map<string, any>, a: Actions['UpdateStart']) {
    state = state.setIn(['loading', 'note.update'], true);
    return state;
  },
  [ActionTypes.UpdateSuccess](state: Immutable.Map<string, any>, a: Actions['UpdateSuccess']) {
    state = state.set('notes', a.payload);
    state = state.setIn(['loading', 'note.update'], false);
    return state;
  },
  [ActionTypes.UpdateError](state: Immutable.Map<string, any>, a: Actions['UpdateError']) {
    state = state.set('error', a.payload);
    state = state.setIn(['loading', 'note.update'], false);
    return state;
  },
  [ActionTypes.ListStart](state: Immutable.Map<string, any>, a: Actions['ListStart']) {
    state = state.setIn(['loading', 'note.list'], true);
    return state;
  },
  [ActionTypes.ListSuccess](state: Immutable.Map<string, any>, a: Actions['ListSuccess']) {
    state = state.set('notes', a.payload);
    state = state.setIn(['loading', 'note.list'], false);
    return state;
  },
  [ActionTypes.ListError](state: Immutable.Map<string, any>, a: Actions['ListError']) {
    state = state.set('error', a.payload);
    state = state.setIn(['loading', 'note.list'], false);
    return state;
  },
  [ActionTypes.GetStart](state: Immutable.Map<string, any>, a: Actions['GetStart']) {
    state = state.setIn(['loading', 'note.get'], true);
    return state;
  },
  [ActionTypes.GetSuccess](state: Immutable.Map<string, any>, a: Actions['GetSuccess']) {
    state = state.set('note', a.payload);
    state = state.setIn(['loading', 'note.get'], false);
    return state;
  },
  [ActionTypes.GetError](state: Immutable.Map<string, any>, a: Actions['GetError']) {
    state = state.set('error', a.payload);
    state = state.setIn(['loading', 'note.get'], false);
    return state;
  },
  [ActionTypes.DeleteStart](state: Immutable.Map<string, any>, a: Actions['DeleteStart']) {
    state = state.setIn(['loading', 'note.delete'], true);
    return state;
  },
  [ActionTypes.DeleteSuccess](state: Immutable.Map<string, any>, a: Actions['DeleteSuccess']) {
    state = state.set('note', a.payload);
    state = state.setIn(['loading', 'note.delete'], false);
    return state;
  },
  [ActionTypes.DeleteError](state: Immutable.Map<string, any>, a: Actions['DeleteError']) {
    state = state.set('error', a.payload);
    state = state.setIn(['loading', 'note.delete'], false);
    return state;
  },
});

// Selectors
const mainSelector = (state) => state.note as Immutable.Map<string, any>;

export const getNotes = createSelector(
  mainSelector,
  (state) => {
    return {
      list: state.get('notes'),
      loading: state.getIn(['loading', 'note.list']),
      error: state.get('error'),
    };
  }
);

// Actions
export function createNote(note: Note) {
  return (dispatch: any, getState) => {
    try {
      dispatch({ type: ActionTypes.CreateStart } as Actions['CreateStart']);
      let notes = getState().note.get('notes');
      notes.push(note);
      dispatch({
        type: ActionTypes.CreateSuccess,
        payload: notes,
      } as Actions['CreateSuccess']);
    } catch (e) {
      dispatch({ type: ActionTypes.CreateError, payload: e } as Actions['CreateError']);
    }
  };
}

export function updateNote(note: Note) {
  return (dispatch: any, getState) => {
    try {
      dispatch({ type: ActionTypes.UpdateStart } as Actions['UpdateStart']);
      let notes = getState().note.get('notes');
      notes = notes.map((item: Note) => {
        if (item.id === note.id) {
          return note;
        } else {
          return item;
        }
      });
      dispatch({
        type: ActionTypes.UpdateSuccess,
        payload: notes,
      } as Actions['UpdateSuccess']);
    } catch (e) {
      dispatch({ type: ActionTypes.UpdateError, payload: e } as Actions['UpdateError']);
    }
  };
}
