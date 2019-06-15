import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export namespace NoteInput {
  export interface Props {
    onChange: (value: string) => any;
    value: string;
    onCancel: () => any;
    onSubmit: () => any;
  }
  export interface State {}
}

export default class NoteInput extends React.Component<NoteInput.Props & NoteInput.State> {
  handleChange = (text) => {
    this.props.onChange(text);
  };

  handleSubmit = () => {
    this.props.onSubmit();
  };

  handleCancel = () => {
    this.props.onCancel();
  };

  render() {
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
            width: '99%',
            display: 'flex',
            paddingBottom: 5,
            paddingLeft: 5,
          }}
        >
          <TextField
            style={{ width: '99%' }}
            label="Adicionar Nota"
            InputLabelProps={{
              style: { color: '#4086c7', fontSize: 22, fontWeight: 'bold' },
            }}
            value={this.props.value}
            onChange={(e) => this.handleChange(e.target.value)}
            margin="normal"
            variant="outlined"
            multiline={true}
            rows={30}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <div style={{ marginRight: 10 }}>
            <Button
              style={{
                backgroundColor: '#4086c7',
                padding: '15px 40px 15px 40px',
                color: '#f7f7f7',
              }}
              onClick={() => this.handleSubmit()}
            >
              Salvar
            </Button>
          </div>
          <div>
            <Button
              onClick={() => this.handleCancel()}
              style={{
                backgroundColor: '#949494',
                padding: '15px 30px 15px 30px',
                color: '#f7f7f7',
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
