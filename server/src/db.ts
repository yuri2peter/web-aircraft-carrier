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
  versionFixer: (record, changeData) => {
    if (record.version !== version) {
      console.log('Inconsistent data version detected, fixing...');
      fixer(record.version, changeData);
      console.log('Data version fixed.');
    }
  },
});

function fixer(
  version: number,
  changeData: (recipe: (base: unknown) => void) => void
) {
  if (version === 1) {
    changeData(v1ToV2);
    return fixer(2, changeData);
  }
  if (version === 2) {
    changeData(v2ToV3);
    return fixer(3, changeData);
  }
}

function v1ToV2(data: any) {}

function v2ToV3(data: any) {}

// 初始化使对数据库进行的操作
export async function initDb() {
  db.changeData((d) => {
    d._restartCount += 1;
  });
}
