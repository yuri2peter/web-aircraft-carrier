// 提供滚动到某元素的方法。
// const scrollTo = useScrollTo();
import React, { useEffect } from 'react';

export function useScrollTo() {
  const markRef = React.useRef('');
  const returnRef = React.useRef((elementId: string) => {
    markRef.current = elementId;
  });
  // 在渲染结束时触发scrollIntoView会有更好的时效性，因为该模块常常在state变更后被调用
  useEffect(() => {
    if (markRef.current) {
      document.getElementById(markRef.current)?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  });
  return returnRef.current;
}
