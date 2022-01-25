import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomePage from './HomePage';

const darkTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
});

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
