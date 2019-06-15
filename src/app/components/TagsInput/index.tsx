import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

export namespace TagsInput {
  export interface Props {
    onChange: (value: string) => any;
    onSubimit: () => any;
    value: string;
  }
  export interface State {}
}

export default class TagsInput extends React.Component<TagsInput.Props & TagsInput.State> {
  handleChange = (text: string) => {
    this.props.onChange(text);
  };

  onSubmit = () => {
    this.props.onSubimit();
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
            width: '100%',
            flex: 1,
            display: 'flex',
            paddingBottom: 5,
            paddingLeft: 5,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <TextField
            style={{ width: '90%' }}
            InputLabelProps={{ style: { color: '#4086c7', fontSize: 16, fontWeight: 'bold' } }}
            label="Adicionar Tag"
            value={this.props.value}
            onChange={(e) => this.handleChange(e.target.value)}
            margin="normal"
            variant="outlined"
            // InputProps={{
            //   startAdornment: 'Tag: ',
            //   color: '#4086c7',
            // }}
          />
          <IconButton onClick={this.onSubmit}>
            <Add style={{ color: '#4086c7', border: '1px solid', borderRadius: 20 }} />
          </IconButton>
        </div>
      </div>
    );
  }
}
