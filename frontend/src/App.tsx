import React from 'react';
import { SnackbarProvider } from 'notistack';
import SnackbarHack from './hacks/snackbarMessage';
import { StoreProvider } from './store/state';
import MainRoute from './routes';

function App() {
  return (
    <SnackbarProvider autoHideDuration={1500}>
      <StoreProvider>
        <SnackbarHack />
        <MainRoute />
      </StoreProvider>
    </SnackbarProvider>
  );
}

export default App;
