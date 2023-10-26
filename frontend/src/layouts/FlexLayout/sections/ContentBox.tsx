import React from 'react';
import { Card } from '@mui/material';
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
    <Card
      sx={
        fullScreen
          ? {
              width: '100%',
              height: '100%',
              overflow: 'auto',
              flexShrink: 0,
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
    </Card>
  );
};

const MobileHack: React.FC = () => {
  useNoScale();
  return null;
};
export default ContentBox;
