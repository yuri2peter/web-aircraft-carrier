// 生成一个1像素的小块，并提供滚动到此处的方法。
// const [scroller, scrollerTo] = useScroller();
import { Box } from '@mui/material';
import React, { useEffect } from 'react';

export function useScroller() {
  const markRef = React.useRef(false);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const returnRef = React.useRef([
    <Box
      ref={boxRef}
      sx={{
        width: '1px',
        height: '1px',
        opacity: 0,
        flexGrow: 0,
        flexShrink: 0,
      }}
    ></Box>,
    () => {
      markRef.current = true;
    },
  ] as [React.ReactElement, () => void]);
  // 在渲染结束时触发scrollIntoView会有更好的时效性，因为该模块常常在state变更后被调用
  useEffect(() => {
    if (markRef.current) {
      boxRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      markRef.current = false;
    }
  });
  return returnRef.current;
}
