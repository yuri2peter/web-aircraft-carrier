// 窗口可视性变化时触发（如tab切换）
import { useEffect } from 'react';

export function useVisibilityChange(cb: (visible: boolean) => void) {
  useEffect(() => {
    const handle = () => {
      cb(!document.hidden);
    };
    document.addEventListener('visibilitychange', handle);
    return () => {
      document.removeEventListener('visibilitychange', handle);
    };
  }, [cb]);
}
