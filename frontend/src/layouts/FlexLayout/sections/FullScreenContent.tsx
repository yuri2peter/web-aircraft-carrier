import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Storyboard from './Storyboard';

const FullScreenContent: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        flexShrink: 0,
        backgroundColor: '#ffffff',
      }}
    >
      <Storyboard />
      <Outlet />
    </Box>
  );
};

export default FullScreenContent;
