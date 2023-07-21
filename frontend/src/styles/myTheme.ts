import { createTheme } from '@mui/material';

export const myTheme = createTheme({
  palette: {
    // mode: 'dark',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
        spellCheck: false,
      },
      styleOverrides: {
        root: {
          wordBreak: 'break-all',
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        placement: 'top',
      },
    },
  },
});
