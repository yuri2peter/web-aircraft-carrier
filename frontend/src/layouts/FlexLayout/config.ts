export const RENDER_MODES = {
  INIT: '初始化',
  MOBILE: '移动端全屏模式',
  TABLET: '平板全屏模式',
  DESKTOP: '桌面端窗口模式',
};

interface Config {
  breakpoints: [number, number]; // MOBILE ~ TABLET 分界线；TABLET ~ DESKTOP 分界线；
  windowSize: [number, number]; // 窗口化模式下窗口的尺寸
  showDevInfo: boolean; // 显示调试信息
  showStoryboard: boolean; // 显示开屏广告
  showBackground: boolean; // 显示背景图层
  enableMobileHack: boolean; // 是否启用移动端禁止缩放等hack
}

export const config: Config = {
  enableMobileHack: false,
  showDevInfo: false,
  showStoryboard: true,
  showBackground: true,
  breakpoints: [660, 1200],
  windowSize: [1100, 760],
};
