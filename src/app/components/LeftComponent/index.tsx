import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { Note } from 'app/ducks/note';
import Button from '@material-ui/core/Button';

export namespace LeftComponent {
  export interface Props {
    notes: Array<Note>;
    onSelect: (note: Note) => void;
  }
  export interface State {}
}

export default class LeftComponent extends React.Component<
  LeftComponent.Props & LeftComponent.State
> {
  handleChange = (text) => {
    console.log(text);
  };

  render() {
    const { notes } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div
          style={{
            flex: 5,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              width: '100%',
              flex: 1,
              display: 'flex',
              paddingBottom: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextField
              style={{ width: '80%' }}
              label="Search"
              onChange={(e) => this.handleChange(e.target.value)}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: <Search />,
              }}
            />
            <IconButton onClick={() => console.log('click')}>
              <Add />
            </IconButton>
          </div>
        </div>
        <div
          style={{
            flex: 5,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        ></div>

        <div style={{ flex: 95 }}>
          <div
            style={{
              marginRight: 10,
              marginLeft: 10,
              marginTop: 15,
            }}
          >
            {notes.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <div
                    style={{
                      borderBottom: '1px solid #b5b5b5',
                      width: '100%',
                      marginTop: 10,
                      paddingTop: 20,
                      paddingBottom: 20,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#000',
                        width: '100%',
                      }}
                      onClick={() => this.props.onSelect(item)}
                    >
                      {item.note.slice(0, 20)}
                    </Button>
                    <div
                      style={{
                        fontWeight: 'lighter',
                        color: '#b5b5b5',
                        fontSize: 18,
                      }}
                    >
                      {item.note.slice(20, 40)}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
