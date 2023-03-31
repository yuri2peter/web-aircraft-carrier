import ora from 'ora';
import { ExampleSchema } from '@local/common';
import { startKoa } from './startKoa';
import { startIO } from './startIO';
import { initDb } from './db';
import { PORT } from './configs';

// ExampleSchema.parse({});

async function main() {
  envTest();
  await initDb();
  const server = startKoa();
  startIO(server);

  server.listen(PORT, () => {
    console.log('listening on port:' + PORT);
    console.log(`http://localhost:${PORT}`);
  });
}
main();

function envTest() {
  // 用于测试纯esm模块的载入情况
  const spinner = ora('Loading...').start();
  spinner.succeed();
}
