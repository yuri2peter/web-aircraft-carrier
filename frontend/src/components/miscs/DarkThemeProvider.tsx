import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import React from 'react';

const DarkThemeProvider: React.FC<{ children: React.ReactElement }> = ({
  children = null,
}) => {
  return (
    <ThemeProvider
      theme={(theme: Theme) => {
        const newTheme = createTheme({
          ...theme,
          palette: {
            mode: 'dark',
          },
        });
        return newTheme;
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default DarkThemeProvider;
