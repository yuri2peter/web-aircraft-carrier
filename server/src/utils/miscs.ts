import md5 from 'md5';
import { z } from 'zod';
import { IS_PROD } from '../configs';

// 连字符转驼峰
export function hyphen2Camel(str: string) {
  const re = /-(\w)/g;
  return str.replace(re, ($0, $1) => {
    return $1.toUpperCase();
  });
}

// 首字母改为大写
export function upperCaseFirst(str: string) {
  if (!str) {
    return '';
  }
  return str[0].toUpperCase() + str.slice(1, str.length);
}

// 树形图返回数据的nodeType对应的文字
export function nodeTypeToLabel(nodeType: string) {
  switch (nodeType) {
    case '1':
      return '';
    case '2':
      return '';
    default:
      return '';
  }
}

// 返回一个在当前运行时累加的id生成器
// usage: runtimeIdGenerator()();
function runtimeIdGenerator() {
  let id = 1;
  return () => {
    id += 1;
    return id;
  };
}
runtimeIdGenerator.gen = runtimeIdGenerator();

// 返回一个在当前浏览器实例累加的ID。
export function generateId() {
  return runtimeIdGenerator.gen();
}

// 获取当前时间的总秒数
export function getCurrentTimeSeconds() {
  return Math.floor(new Date().getTime() / 1000);
}

// 对于小于0的数,取0
export function getZeroIfLessThanZero(num: number) {
  return num < 0 ? 0 : num;
}

// 等待
export function sleep(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

// 保留3位小数
export function fixNumber(num: number) {
  return Math.round(num * 1000) / 1000;
}

// 限制数字在某一范围内
export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

// 将键值对的键名转化为枚举约束
export function zodEnumFromObjKeys<K extends string>(
  obj: Record<K, any>
): z.ZodEnum<[K, ...K[]]> {
  const [firstKey, ...otherKeys] = Object.keys(obj) as K[];
  return z.enum([firstKey, ...otherKeys]);
}

// 服务端意外错误捕捉
export function uncaughtErrorHandle() {
  const handle = (e: any) => {
    console.error(`[${new Date().toLocaleString()}] Uncaught Error:\n`, e);
  };
  try {
    process.on('uncaughtException', handle);
    process.on('unhandledRejection', handle);
  } catch (error) {
    handle(error);
  }
}

// 获取随机字符串，可指定长度
export function getRandomString(length = 8) {
  return md5(Math.random().toString(36)).substring(0, length);
}

// 检查字符串是否是以某些字符开头,支持传入除外列表
// 如 startsWith('abc', ['a']) === true
// 但是 startsWith('abc', ['a'], ['ab']) === false
export function startsWith(
  str: string,
  checkList: string[],
  excludeList: string[] = []
) {
  const inList = (list: string[]) => {
    return list.some((item) => {
      return str.startsWith(item);
    });
  };
  return inList(checkList) && !inList(excludeList);
}

export function log(message: string) {
  console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
}

export default function debugLog(message: string) {
  if (!IS_PROD) {
    log(message);
  }
}
