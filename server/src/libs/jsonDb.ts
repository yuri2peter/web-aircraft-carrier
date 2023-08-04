/**
 * A simple database based json file.
 * @author yuri2peter
 */
import dayjs from 'dayjs';
import { Cron } from 'croner';
import { Immutable, produce } from 'immer';
import fs from 'fs-extra';
import lodash from 'lodash';
import { z } from 'zod';
import path from 'path';

const { throttle } = lodash;

const backupPlanSchema = z.object({
  dir: z.string(), // 备份目录
  maxBackups: z.number().int().min(1), // 备份文件最大数量
  cronExp: z.string(), // 定时任务 cron 描述。如 "0 23 * * *" 表示每天23:00执行；"*/30 * * * *" 表示每隔30分钟执行一次。
});
type BackupPlan = z.infer<typeof backupPlanSchema>;

export default class JsonDb<T> {
  readonly file: string = '';
  readonly version: number = 0;
  readonly debug: boolean = false;
  private data: Immutable<T>;
  private autoSaveFile: () => void = () => {};

  /**
   *
   * @param file db file path
   * @param defaultValue default value when file is not available
   * @param version db schema version
   * @param versionFixer use this to update your data schema
   * @param disableAutoSave disable auto save feature
   * @param autoSaveWaitMilliseconds throttle delay for auto-saving file
   */
  constructor(params: {
    file: string; // 数据文件
    defaultValue: T; // 默认值
    version?: number; // 版本号
    versionFixer?: (value: unknown, oldVersion: number) => T; // 版本修复器
    disableAutoSave?: boolean; // 是否禁用自动保存
    autoSaveWaitMilliseconds?: number; // 自动保存延迟
    backup?: BackupPlan;
    debug?: boolean;
  }) {
    const {
      file,
      defaultValue,
      version = 1,
      versionFixer,
      disableAutoSave = false,
      autoSaveWaitMilliseconds = 8000,
      backup,
      debug,
    } = params;
    this.debug = !!debug;
    this.file = file;
    this.version = version;
    this.data = defaultValue as Immutable<T>;
    if (!disableAutoSave) {
      this.autoSaveFile = throttle(() => {
        this.saveFile();
      }, autoSaveWaitMilliseconds);
    }
    this.loadFile(versionFixer);
    this.startBackupPlan(backup);
  }

  /**
   * get newest data
   */
  getData() {
    return this.data;
  }

  /**
   * set data
   * @param data
   */
  setData(data: T) {
    this.data = data as Immutable<T>;
    this.autoSaveFile();
  }

  /**
   * see more usage at `immer.js`
   * @param recipe change value inside the recipe, but no returns
   */
  changeData(recipe: (base: T) => void) {
    this.data = produce((d) => {
      recipe(d);
    })(this.data) as Immutable<T>;
    this.autoSaveFile();
  }

  private loadFile(versionFixer?: (value: any, oldVersion: number) => T) {
    try {
      const content = fs.readFileSync(this.file, 'utf8');
      const { data, version } = JSON.parse(content) as any;
      // trying fix version
      this.data =
        versionFixer && version !== this.version
          ? versionFixer(data, version)
          : data;
    } catch (error) {
      console.log('[jsonDb] Error parsing db file, use default value.');
    }
    this.saveFile();
  }

  private startBackupPlan(backup?: BackupPlan) {
    if (!backup) {
      return;
    }
    backupPlanSchema.parse(backup);
    const { dir, maxBackups, cronExp } = backup;
    const job = Cron(
      cronExp,
      {
        name: 'jsonDb_backup',
      },
      () => {
        // 获取时间字符串
        const timeStr = dayjs().format('YYYY-MM-DD HH:mm');
        if (this.debug) {
          console.log(`[jsonDb] Backup at ${timeStr}.`);
        }

        // 写入文件
        const filePath = path.join(dir, `${timeStr}.json`);
        fs.ensureFileSync(filePath);
        fs.writeFileSync(
          filePath,
          JSON.stringify({
            data: this.data,
            version: this.version,
            updatedAtString: new Date().toString(),
            updatedAtTime: new Date().getTime(),
          })
        );

        // 删除超限的备份
        fs.ensureDirSync(dir);
        const backupFileNames: string[] = [];
        fs.readdirSync(dir).forEach((file) => {
          if (file.endsWith('.json')) {
            backupFileNames.push(file);
          }
        });
        // 把文件名按时间排序（旧->新）
        backupFileNames.sort((a, b) => {
          const getDateStr = (s: string) => {
            const reg = /^(.*)\.json$/;
            const execRel = reg.exec(s);
            return execRel ? execRel[1] : '';
          };
          return dayjs(getDateStr(a)).diff(dayjs(getDateStr(b)));
        });
        // 对超过上限的文件进行删除
        for (
          let index = 0;
          index < backupFileNames.length - maxBackups;
          index++
        ) {
          fs.unlink(path.join(dir, backupFileNames[index])).catch((e) => {
            console.warn(
              '[jsonDb] Error deleting backup file ' + backupFileNames[index]
            );
          });
        }
      }
    );
  }

  saveFile() {
    fs.ensureFileSync(this.file);
    fs.writeFileSync(
      this.file,
      JSON.stringify({
        data: this.data,
        version: this.version,
        updatedAtString: new Date().toString(),
        updatedAtTime: new Date().getTime(),
      })
    );
  }
}
