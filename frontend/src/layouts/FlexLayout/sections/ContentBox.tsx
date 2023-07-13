import React from 'react';
import { Paper } from '@mui/material';
import { useLayoutContext } from './context';
import Storyboard from './Storyboard';
import { Outlet } from 'react-router-dom';
import { config } from '../config';
import { useNoScale } from 'src/hooks/useNoScale';

const ContentBox: React.FC<{ fullScreen?: boolean }> = ({
  fullScreen = true,
}) => {
  const { width, height, isMobile } = useLayoutContext();
  return (
    <Paper
      sx={
        fullScreen
          ? {
              width: '100%',
              height: '100%',
              overflow: 'auto',
              flexShrink: 0,
              background: 'white',
            }
          : {
              width,
              height,
              position: 'relative',
              overflow: 'hidden',
            }
      }
      square={fullScreen}
      elevation={fullScreen ? 0 : 16}
    >
      {isMobile && config.enableMobileNoScaleHack && <MobileHack />}
      <Storyboard />
      <Outlet />
    </Paper>
  );
};

const MobileHack: React.FC = () => {
  useNoScale();
  return null;
};
export default ContentBox;
