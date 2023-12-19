const { start } = require('chii');

export function startChii(port = 0) {
  start({
    port,
    basePath: '/chii',
  });
  console.log('Chii Web debugger started.');
}
