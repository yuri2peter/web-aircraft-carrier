import { Box } from '@mui/material';
import React from 'react';
import { config } from '../config';

const bgImage = 'url(/backgrounds/low-poly-grid-haikei.svg)';

const Background: React.FC = () => {
  if (!config.showBackground) {
    return null;
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        background: bgImage,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    ></Box>
  );
};

export default Background;
