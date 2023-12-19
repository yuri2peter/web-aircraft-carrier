import openBrowsers from 'open-browsers';
import { startKoa } from './startKoa';
import { startIO } from './startIO';
// import { initDb } from './db';
import { OPEN_BROWSER, PORT } from './configs';
import { USE_SOCKET } from '@local/common/configs';
import { uncaughtErrorHandle } from './utils/miscs';

uncaughtErrorHandle();

export async function startServer(): Promise<number> {
  // await initDb();
  const server = startKoa();
  USE_SOCKET && startIO(server);
  return new Promise((resolve, reject) => {
    server.once('error', (error) => {
      reject(error);
    });
    server.listen(PORT, () => {
      let port = 0;
      try {
        // @ts-ignore
        port = server.address().port;
      } catch (error) {}
      console.log('Server started at ' + new Date().toLocaleString());
      const url = `http://localhost:${port}`;
      console.log('Local:   ' + url);
      resolve(port);
      if (OPEN_BROWSER) {
        openBrowsers(url);
      }
    });
  });
}

function main() {
  startServer()
    .then((port) => {
      // 记录真实的端口号（设置端口号0可产生随机端口号，适用于electron）
      process.env._PORT = String(port);
    })
    .catch((error) => {
      console.error(error);
      process.env._PORT = String(-1); // 约定-1表示启动失败
    });
}

main();
