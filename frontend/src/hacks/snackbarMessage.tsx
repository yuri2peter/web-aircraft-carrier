import React from 'react';
import {
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
  useSnackbar,
  VariantType,
} from 'notistack';

const refEnqueueSnackbar = {
  current: (() => {}) as unknown as (
    message: SnackbarMessage,
    options?: OptionsObject | undefined
  ) => SnackbarKey,
};

const SnackbarHack: React.FC<{}> = () => {
  console.log(useSnackbar());
  const { enqueueSnackbar } = useSnackbar();
  refEnqueueSnackbar.current = enqueueSnackbar;
  return <></>;
};

export default SnackbarHack;

export function snackbarMessage(
  message: string,
  variant: VariantType = 'info'
) {
  refEnqueueSnackbar.current(message, {
    variant,
    anchorOrigin: { horizontal: 'center', vertical: 'top' },
  });
}
