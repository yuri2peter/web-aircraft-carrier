import { Zoom, createTheme } from '@mui/material';

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
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
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
        TransitionComponent: Zoom,
        enterDelay: 500,
        disableInteractive: true,
      },
      styleOverrides: {
        tooltip: {
          background: 'black',
        },
        arrow: {
          color: 'black',
        },
      },
    },
  },
});
