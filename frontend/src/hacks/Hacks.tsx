import React from 'react';
import { DialogConfirmHack } from './comfirm';
import { NavigationHack } from './navigate';
import { SnackbarHack } from './snackbarMessage';

const Hacks: React.FC = () => {
  return (
    <>
      <SnackbarHack />
      <NavigationHack />
      <DialogConfirmHack />
    </>
  );
};

export default Hacks;
