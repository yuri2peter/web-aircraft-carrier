import path from 'path';
import { ROOT_PATH } from './configs';
import JsonDb from './libs/jsonDb';
import { fixer } from './dbVersionFixer';

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
  versionFixer: (record, changeData) => {
    if (record.version !== version) {
      console.log('Inconsistent data version detected, fixing...');
      fixer(record.version, changeData);
      console.log('Data version fixed.');
    }
  },
});

// 初始化使对数据库进行的操作
export async function initDb() {
  db.changeData((d) => {
    d._restartCount += 1;
  });
}
