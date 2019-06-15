import * as React from 'react';
import uuid from 'uuid/v4';
import Chip from '@material-ui/core/Chip';
import TagsInput from 'app/components/TagsInput';
import NoteInput from 'app/components/NoteInput';
import { Note } from 'app/ducks/note';
import Moment from 'moment';
Moment.locale('pt-br');

export namespace RightComponent {
  export interface Props {
    onSaveNote: (note: Note) => any;
    noteEdit?: Note;
    onCancel: () => any;
  }
  export interface State {}
}

export default class RightComponent extends React.Component<
  RightComponent.Props & RightComponent.State
> {
  state = { tags: [] as Array<any>, note: '' as string, tag: '' };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.noteEdit !== undefined) {
        this.setState({ tags: this.props.noteEdit.tags, note: this.props.noteEdit.note });
        console.log('==========>', this.props.noteEdit && this.props.noteEdit.tags);
      }
    }
  }

  handleChangeTag = (value: string) => {
    this.setState({ tag: value });
  };

  handleSubmitTag = () => {
    let { tags } = this.state;
    let tag = {
      id: uuid(),
      tag: this.state.tag,
    };
    this.state.tag.length > 0 ? tags.push(tag) : null;

    this.setState({ tags, tag: '' });
  };

  handleDeleteTag = (id: string) => {
    let { tags } = this.state;
    let removedTags: Array<any> = [];

    tags.forEach((item) => {
      if (item.id !== id) {
        removedTags.push(item);
      }
    });

    this.setState({ tags: removedTags });
  };

  onChangeNote = (text: string) => {
    this.setState({ note: text });
  };

  handleSubmitNote = () => {
    if (this.props.noteEdit !== undefined) {
      let note = {
        ...this.props.noteEdit,
        note: this.state.note,
        tags: this.state.tags,
      };
      this.props.onSaveNote(note);
      this.setState({ note: '', tags: [] });
    } else {
      if (this.state.note.length > 0 && this.state.tags.length > 0) {
        let note = {
          id: uuid(),
          note: this.state.note,
          tags: this.state.tags,
          createdAt: Moment().format('DD/MM/YYYY HH:mm:ss'),
        };
        this.props.onSaveNote(note);
        this.setState({ note: '', tags: [] });
      }
    }
  };

  handleCancel = () => {
    this.props.onCancel();
    this.setState({ note: '', tags: [] });
  };

  render() {
    const { tags, note, tag } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          height: '100%',
          backgroundColor: '#ececec',
        }}
      >
        <div
          style={{
            flex: 5,
            flexDirection: 'row',
            display: 'flex',
          }}
        >
          <div style={{ flex: 30 }}>
            <TagsInput
              onChange={(value: string) => this.handleChangeTag(value)}
              onSubimit={this.handleSubmitTag}
              value={tag}
            ></TagsInput>
          </div>
          <div style={{ flex: 70, paddingTop: 20, paddingLeft: 20 }}>
            {tags.map((item) => {
              return (
                <Chip
                  style={{ backgroundColor: '#4086c7', color: '#fff' }}
                  key={item.id}
                  label={item.tag}
                  onDelete={() => this.handleDeleteTag(item.id)}
                />
              );
            })}
          </div>
        </div>
        <div
          style={{
            flex: 5,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            display: 'flex',
            color: '#949494',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          {this.props.noteEdit
            ? this.props.noteEdit.createdAt
            : Moment().format('DD/MM/YYYY HH:mm:ss')}
        </div>
        <div style={{ flex: 95 }}>
          <NoteInput
            onChange={(value: string) => this.onChangeNote(value)}
            value={note}
            onCancel={() => this.handleCancel()}
            onSubmit={() => this.handleSubmitNote()}
          />
        </div>
      </div>
    );
  }
}
