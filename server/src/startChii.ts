const { start } = require('chii');

export function startChii(port = 0) {
  console.log('Starting Chii Web debugger...');
  start({
    port,
    basePath: '/chii',
  });
  console.log('Chii Web debugger started.');
}
