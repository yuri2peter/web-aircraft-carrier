import React from 'react';
import { SnackbarProvider } from 'notistack';
import MainRoute from './routes';
import Hacks from './hacks/Hacks';

function App() {
  return (
    <SnackbarProvider autoHideDuration={1500}>
      <Hacks />
      <MainRoute />
    </SnackbarProvider>
  );
}

export default App;
