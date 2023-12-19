import React, { useEffect } from 'react';
import { use100vh } from 'react-div-100vh';
import { useResizeDetector } from 'react-resize-detector';
import ParentBox from './sections/ParentBox';
import ContentBox from './sections/ContentBox';
import { useDebouncedCallback } from 'src/hooks/useDebouncedCallback';
import { selectLayout, useFlexLayout } from './useFlexLayout';

/**
 * 万能弹性布局器
 */
const FlexLayout: React.FC<{}> = () => {
  const height100vh = use100vh() || 0;
  const { width = 0, height = 0, ref } = useResizeDetector();
  const setSize = useFlexLayout((s) => s.setSize);
  const { isReady } = useFlexLayout(selectLayout);
  const setSizeDebounced = useDebouncedCallback(setSize, [], 300);
  useEffect(() => {
    setSizeDebounced({
      width,
      height,
    });
  }, [setSizeDebounced, width, height]);
  return (
    <ParentBox sizerRef={ref} height={height100vh}>
      {isReady && <ContentBox />}
    </ParentBox>
  );
};

export default FlexLayout;
