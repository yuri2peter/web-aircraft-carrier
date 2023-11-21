import { createSelector } from 'reselect';
import { createZustandStore } from 'src/store/createZustand';
import { RENDER_MODES, config } from './config';
import debugLog from 'src/utils/debugLog';

const { breakpoints, showDevInfo } = config;

const state = {
  width: 0,
  height: 0,
};
type State = typeof state;

export const useFlexLayout = createZustandStore(
  state,
  (set) => {
    return {
      setSize: (size: { width: number; height: number }) => {
        set(size);
      },
    };
  },
  'useFlexLayout'
);

export const selectLayout = createSelector(
  (s: State) => s.width,
  (s: State) => s.height,
  (width, height) => {
    const rel = {
      width,
      height,
      isReady: false,
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      isFullScreen: false,
    };
    if (!width || !height) {
      showDevInfo && debugLog(RENDER_MODES.INIT);
      return rel;
    }
    rel.isReady = true;
    if (width < breakpoints[0]) {
      rel.isMobile = true;
      rel.isFullScreen = true;
      showDevInfo && debugLog(RENDER_MODES.MOBILE);
      return rel;
    }
    if (width < breakpoints[1]) {
      rel.isTablet = true;
      rel.isFullScreen = true;
      showDevInfo && debugLog(RENDER_MODES.TABLET);
      return rel;
    } else {
      rel.isDesktop = true;
      showDevInfo && debugLog(RENDER_MODES.DESKTOP);
      return rel;
    }
  }
);
