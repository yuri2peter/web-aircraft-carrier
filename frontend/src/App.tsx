import React from 'react';
import { StoreProvider } from './store/state';
import MainRoute from './routes';

function App() {
  return (
    <StoreProvider>
      <MainRoute />
    </StoreProvider>
  );
}

export default App;
