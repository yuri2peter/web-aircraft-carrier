import React from 'react';
import { Card } from '@mui/material';
import Storyboard from './Storyboard';
import { Outlet } from 'react-router-dom';
import { config } from '../config';
import { useNoScale } from 'src/hooks/useNoScale';
import { selectLayout, useFlexLayout } from '../useFlexLayout';

const ContentBox: React.FC = () => {
  const { isFullScreen, isMobile } = useFlexLayout(selectLayout);
  return (
    <Card
      sx={
        isFullScreen
          ? {
              width: '100%',
              height: '100%',
              overflow: 'auto',
              flexShrink: 0,
            }
          : {
              width: config.windowSize[0],
              height: config.windowSize[1],
              position: 'relative',
              overflow: 'hidden',
            }
      }
      square={isFullScreen}
      elevation={isFullScreen ? 0 : 16}
    >
      {isMobile && config.enableMobileHack && <MobileHack />}
      <Storyboard />
      <Outlet />
    </Card>
  );
};

const MobileHack: React.FC = () => {
  useNoScale();
  return null;
};
export default ContentBox;
