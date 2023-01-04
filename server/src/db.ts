import path from "path";
import { ROOT_PATH } from "../constant";
import JsonDb from "./libs/jsonDb";

const dbFile = path.resolve(ROOT_PATH, "./volumes/db/main.json");

const defaultValue = { _restartCount: 0 };
type Data = typeof defaultValue;
const version = 1;

export const db = new JsonDb({
  file: dbFile,
  version,
  defaultValue,
  versionFixer: (value, oldVersion) => {
    if (oldVersion !== version) {
      return defaultValue;
    } else {
      return value as Data;
    }
  },
});

export async function initDb() {
  // dev restart counter
  db.changeData((d) => {
    d._restartCount += 1;
  });
}
