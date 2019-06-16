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
  Filter = 'note.filter',
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
  DeleteSuccess: { type: ActionTypes.DeleteSuccess; payload: Array<Note> };
  DeleteError: { type: ActionTypes.DeleteError; payload: Error };
  Filter: { type: ActionTypes.Filter; payload: string };
};

export type LoadingSections = {
  'note.basic': boolean;
};

const data = localStorage.getItem('notes');

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
  notes: data !== null ? JSON.parse(data) : [],
  note: undefined,
  filter: '',
});

export const Reducer = createReducer(initialState, {
  [ActionTypes.CreateStart](state: Immutable.Map<string, any>, a: Actions['CreateStart']) {
    state = state.setIn(['loading', 'note.create'], true);
    return state;
  },
  [ActionTypes.CreateSuccess](state: Immutable.Map<string, any>, a: Actions['CreateSuccess']) {
    state = state.set('note', a.payload);
    state = state.setIn(['loading', 'note.create'], false);
    localStorage.setItem('notes', JSON.stringify(a.payload));
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
    localStorage.setItem('notes', JSON.stringify(a.payload));
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
    state = state.set('notes', a.payload);
    state = state.setIn(['loading', 'note.delete'], false);
    localStorage.setItem('notes', JSON.stringify(a.payload));
    return state;
  },
  [ActionTypes.DeleteError](state: Immutable.Map<string, any>, a: Actions['DeleteError']) {
    state = state.set('error', a.payload);
    state = state.setIn(['loading', 'note.delete'], false);
    return state;
  },
  [ActionTypes.Filter](state: Immutable.Map<string, any>, a: Actions['Filter']) {
    state = state.set('filter', a.payload);
    return state;
  },
});

// Selectors
const mainSelector = (state) => state.note as Immutable.Map<string, any>;

export const getNotes = createSelector(
  mainSelector,
  (state) => {
    const notes = state.get('notes', []);
    let filter = state.get('filter') || '';
    let notesFiltered: Array<Note> = [];

    if (filter.length > 0 && notes.length > 0) {
      filter = filter.replace(/\s+/g, ' ');
      let arr = filter.length > 0 ? filter.split(' ') : [];

      //remove empty elements
      let arrFilter: Array<string> = [];
      arr.forEach((element) => {
        if (element.length > 0) {
          arrFilter.push(element);
        }
      });

      //build regex
      let regex = `\\`;
      for (let i = 0; i < arrFilter.length; i++) {
        if (arrFilter.length === 1) {
          regex = regex + `${arrFilter[i]}`;
        } else {
          if (i === arrFilter.length - 1) {
            regex = regex + `${arrFilter[i]}`;
          } else {
            regex = regex + `${arrFilter[i]}|`;
          }
        }
      }

      if (arrFilter.length > 0) {
        const regEx = new RegExp(regex, 'gi');

        notes.forEach((item: Note) => {
          let match = item.note.match(regEx);
          if (match !== null) {
            notesFiltered.push(item);
          }
        });
      }

      return {
        list: notesFiltered || [],
        loading: state.getIn(['loading', 'note.list']),
        error: state.get('error'),
      };
    } else {
      return {
        list: state.get('notes', []),
        loading: state.getIn(['loading', 'note.list']),
        error: state.get('error'),
      };
    }
  }
);

export const getFilter = createSelector(
  mainSelector,
  (state) => {
    return {
      filter: state.get('filter') || '',
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

export function deleteNote(id: string) {
  return (dispatch: any, getState) => {
    try {
      dispatch({ type: ActionTypes.DeleteStart } as Actions['DeleteStart']);
      let notes = getState().note.get('notes');
      let notesRemoved: Array<Note> = [];
      notes.forEach((note: Note) => {
        if (note.id !== id) {
          notesRemoved.push(note);
        }
      });
      dispatch({
        type: ActionTypes.DeleteSuccess,
        payload: notesRemoved,
      } as Actions['DeleteSuccess']);
    } catch (e) {
      dispatch({ type: ActionTypes.UpdateError, payload: e } as Actions['UpdateError']);
    }
  };
}

export function createFilter(keywords: string) {
  return (dispatch: any) => {
    dispatch({ type: ActionTypes.Filter, payload: keywords });
  };
}
