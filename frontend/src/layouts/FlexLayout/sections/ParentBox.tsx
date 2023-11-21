import { Box } from '@mui/material';
import React from 'react';
import Background from './Background';
import { selectLayout, useFlexLayout } from '../useFlexLayout';

const ParentBox: React.FC<{
  sizerRef: any;
  height: number;
  children: React.ReactNode;
}> = ({ sizerRef, height, children }) => {
  const { isReady } = useFlexLayout(selectLayout);
  return (
    <Box
      ref={sizerRef}
      sx={{
        width: '100vw',
        height: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {isReady && <Background />}
      {children}
    </Box>
  );
};

export default ParentBox;
