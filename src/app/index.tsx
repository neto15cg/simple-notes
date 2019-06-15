import * as React from 'react';
import { Route, Switch } from 'react-router';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Loadable from 'react-loadable';
import Loader from 'app/components/PageLoader';

const NotesApp = Loadable({
  loader: () => import('app/containers/Notes'),
  loading() {
    return <Loader />;
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#2ca1a5',
      main: '#2B918C',
      dark: '#1b4e5b',
    },
    secondary: {
      light: '#d5b740',
      main: '#d59541',
      dark: '#d57940',
    },
    background: {
      hover: '#f1f1f1',
    },
  },
} as any);

export const App = hot(module)(() => (
  <MuiThemeProvider theme={theme}>
    <Switch>
      <Route path="/" component={NotesApp} />
    </Switch>
  </MuiThemeProvider>
));
