import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import LeftComponent from 'app/components/LeftComponent';
import RightComponent from 'app/components/RightComponent';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { getNotes, createNote, updateNote, Note } from 'app/ducks/note';

export namespace Notes {
  export interface Props extends RouteComponentProps<void> {
    notes: any;
    createNote: (note: Note) => any;
    updateNote: (note: Note) => any;
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

  render() {
    const { list } = this.props.notes;
    return (
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', backgroundColor: '#fff' }}>
        <React.Fragment>
          <div style={{ flex: 30, borderRight: '1px solid #ccc' }}>
            <LeftComponent notes={list} onSelect={(note: Note) => this.handleEditNote(note)} />
          </div>
        </React.Fragment>
        <React.Fragment>
          <div style={{ flex: 70 }}>
            <RightComponent
              onSaveNote={(note: any) => this.handleSaveNote(note)}
              noteEdit={this.state.noteEdit}
              onCancel={this.handleCancel}
            />
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default connect(
  createSelector(
    getNotes,
    (notes) => ({ notes })
  ),
  (dispatch: any) => ({
    createNote: (note: Note) => dispatch(createNote(note)),
    updateNote: (note: Note) => dispatch(updateNote(note)),
  })
)(Notes);
