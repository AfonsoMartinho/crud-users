import React from 'react';
import { observer } from 'mobx-react-lite';
import { UsersPage } from './views/UsersPage';
import './app.gb.scss';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export const App: React.FC = observer((props) => {
    return (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <div className="crud-users">
            <UsersPage />
          </div>
        </ThemeProvider>
    );
  }
);

export default App
