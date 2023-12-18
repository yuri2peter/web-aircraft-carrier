import { create } from 'zustand';
import { createPortal } from 'react-dom';
import { useRef } from 'react';

// 生成portal相关的容器钩子和内容组件
export function createPortalPair() {
  const usePortalStore = create<{
    containerDom: HTMLElement | null;
    setContainerDom: (containerDom: HTMLElement | null) => void;
  }>((set) => ({
    containerDom: null,
    setContainerDom: (containerDom) => set({ containerDom }),
  }));
  const usePortalContainerRef = () => {
    const { setContainerDom } = usePortalStore();
    const { current: containeRef } = useRef((dom: HTMLElement) => {
      setContainerDom(dom);
    });
    return containeRef;
  };
  const PortalContent = ({ children }: { children?: React.ReactNode }) => {
    const { containerDom } = usePortalStore();
    if (!containerDom) return null;
    return createPortal(children, containerDom);
  };
  return {
    usePortalContainerRef,
    PortalContent,
  };
}
