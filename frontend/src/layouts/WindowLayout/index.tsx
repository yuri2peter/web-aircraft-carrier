import { Box, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { use100vh } from 'react-div-100vh';

const scale = 3.5;
const size1 = 297 * scale;
const size2 = 210 * scale;

/**
 * 窗口布局
 */
const WindowLayout: React.FC<{}> = () => {
  const height100vh = use100vh();
  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom right, #8386a5, #627993)',
        width: '100vw',
        height: height100vh,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
      }}
    >
      <Paper
        sx={{
          backgroundColor: 'white',
          width: size1,
          height: size2,
          position: 'relative',
          overflow: 'hidden',
        }}
        elevation={16}
      >
        <Outlet />
      </Paper>
    </Box>
  );
};

export default WindowLayout;
