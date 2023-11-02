// 视口可见性变化检测器
import { useInViewport } from 'react-in-viewport';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';

const ViewDetector: React.FC<{
  onViewChange: (visible: boolean) => void;
}> = ({ onViewChange }) => {
  const myRef = React.useRef(null);
  const { inViewport } = useInViewport(myRef);
  useEffect(() => {
    onViewChange(inViewport);
  }, [inViewport, onViewChange]);
  return (
    <Box
      ref={myRef}
      sx={{
        width: '1px',
        height: '1px',
        opacity: 0,
        flexGrow: 0,
        flexShrink: 0,
      }}
    ></Box>
  );
};

export default ViewDetector;
