import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import LeftComponent from 'app/components/LeftComponent';
import RightComponent from 'app/components/RightComponent';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  Note,
  createFilter,
  getFilter,
} from 'app/ducks/note';

export namespace Notes {
  export interface Props extends RouteComponentProps<void> {
    notes: any;
    filter: string;
    createNote: (note: Note) => any;
    updateNote: (note: Note) => any;
    deleteNote: (id: string) => any;
    createFilter: (filter: string) => any;
  }
  export interface State {}
}

export class Notes extends React.Component<Notes.Props & Notes.State> {
  state = {
    noteEdit: undefined,
  };

  handleSaveNote = (note: Note) => {
    if (this.state.noteEdit !== undefined) {
      this.props.updateNote(note);
      this.setState({ noteEdit: undefined });
    } else {
      this.props.createNote(note);
    }
  };

  handleEditNote = (note: Note) => {
    this.setState({ noteEdit: note });
  };

  handleCancel = () => {
    this.setState({ noteEdit: undefined });
  };

  handleDelete = (id: string) => {
    this.props.deleteNote(id);
    this.setState({ noteEdit: undefined });
  };

  handleFilter = (filter: string) => {
    this.props.createFilter(filter);
  };

  render() {
    const { list } = this.props.notes;

    return (
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: '#fff' }}>
        <div style={{ flex: 30, borderRight: '1px solid #ccc' }}>
          <LeftComponent
            notes={list}
            onSelect={(note: Note) => this.handleEditNote(note)}
            onChangeFilter={(filter: string) => this.handleFilter(filter)}
          />
        </div>
        <div style={{ flex: 70 }}>
          <RightComponent
            onSaveNote={(note: Note) => this.handleSaveNote(note)}
            noteEdit={this.state.noteEdit}
            onCancel={this.handleCancel}
            onDelete={(id: string) => this.handleDelete(id)}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  createSelector(
    getNotes,
    getFilter,
    (notes, filter) => ({ notes, ...filter })
  ),
  (dispatch: any) => ({
    createNote: (note: Note) => dispatch(createNote(note)),
    updateNote: (note: Note) => dispatch(updateNote(note)),
    deleteNote: (id: string) => dispatch(deleteNote(id)),
    createFilter: (filter: string) => dispatch(createFilter(filter)),
  })
)(Notes);
