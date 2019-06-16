import * as React from 'react';
import uuid from 'uuid/v4';
import Chip from '@material-ui/core/Chip';
import TagsInput from 'app/components/TagsInput';
import NoteInput from 'app/components/NoteInput';
import { Note } from 'app/ducks/note';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import Moment from 'moment';

Moment.locale('pt-br');

export namespace RightComponent {
  export interface Props {
    onSaveNote: (note: Note) => any;
    onCancel: () => any;
    onDelete: (id: string) => any;
    noteEdit?: Note;
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
      ToastsStore.success('Nota atualizada com sucesso');
      let note = {
        ...this.props.noteEdit,
        note: this.state.note,
        tags: this.state.tags,
      };
      this.props.onSaveNote(note);
      this.setState({ note: '', tags: [] });
    } else {
      if (this.state.note.length > 0 && this.state.tags.length > 0) {
        ToastsStore.success('Nota criada com sucesso');
        let note = {
          id: uuid(),
          note: this.state.note,
          tags: this.state.tags,
          createdAt: Moment().format('DD/MM/YYYY HH:mm:ss'),
        };
        this.props.onSaveNote(note);
        this.setState({ note: '', tags: [] });
      } else {
        if (this.state.tags.length <= 0 && this.state.note.length <= 0) {
          ToastsStore.warning('É necessário adicionar pelo menos uma tag e uma nota');
        } else if (this.state.tags.length <= 0) {
          ToastsStore.warning('É necessário adicionar pelo menos uma tag');
        } else {
          ToastsStore.warning('É necessário adicionar pelo menos uma nota');
        }
      }
    }
  };

  handleCancel = () => {
    this.props.onCancel();
    this.setState({ note: '', tags: [] });
  };

  handleDelete = () => {
    if (this.props.noteEdit) {
      this.props.onDelete(this.props.noteEdit.id);
      ToastsStore.success('Nota removida com sucesso');
      this.setState({ note: '', tags: [] });
    }
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
                  style={{
                    backgroundColor: '#2b918c',
                    color: '#fff',
                    marginRight: 5,
                    marginBottom: 5,
                  }}
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
            justifyContent: 'space-between',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div
            style={{
              color: '#949494',
              fontSize: 18,
              fontWeight: 'bold',
              flex: 1,
              marginRight: 10,
              marginLeft: 10,
              flexDirection: 'row',
              display: 'flex',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 60,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              {this.props.noteEdit
                ? this.props.noteEdit.createdAt
                : Moment().format('DD/MM/YYYY HH:mm:ss')}
            </div>
            <div
              style={{
                flex: 40,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginRight: 10,
              }}
            >
              {this.props.noteEdit ? (
                <div>
                  <IconButton onClick={this.handleDelete}>
                    <DeleteOutlinedIcon style={{ color: '#2b918c' }} />
                  </IconButton>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div style={{ flex: 95 }}>
          <NoteInput
            onChange={(value: string) => this.onChangeNote(value)}
            value={note}
            onCancel={() => this.handleCancel()}
            onSubmit={() => this.handleSubmitNote()}
            editable={this.props.noteEdit ? true : false}
          />
        </div>
        <ToastsContainer position={ToastsContainerPosition.BOTTOM_RIGHT} store={ToastsStore} />
      </div>
    );
  }
}
