import path from 'path';
import { ROOT_PATH } from './configs';
import JsonDb from './libs/jsonDb';

const dbFile = path.resolve(ROOT_PATH, './data/db/main.json');
const dbBackUpDir = path.resolve(ROOT_PATH, './data/db/main_backup');

const defaultValue = { _restartCount: 0 };
const version = 1;

export const db = new JsonDb({
  file: dbFile,
  backup: {
    dir: dbBackUpDir,
    cronExp: '*/30 * * * *',
    maxBackups: 150,
  },
  version,
  defaultValue,
  versionFixer: (value, oldVersion) => {
    if (oldVersion !== version) {
      return defaultValue;
    } else {
      return value as typeof defaultValue;
    }
  },
});

// 初始化使对数据库进行的操作
export async function initDb() {
  db.changeData((d) => {
    d._restartCount += 1;
  });
}
