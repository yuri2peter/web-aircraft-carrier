import path from 'path';
import { ROOT_PATH } from './configs';
import JsonDb from './libs/jsonDb';

const dbFile = path.resolve(ROOT_PATH, './data/db/main.json');

const defaultValue = { _restartCount: 0 };
const version = 1;

export const db = new JsonDb({
  file: dbFile,
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

export async function initDb() {
  // dev restart counter
  db.changeData((d) => {
    d._restartCount += 1;
  });
}
