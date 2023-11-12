// 一个全局缓存钩子
import { useState, useEffect } from 'react';
import MemCache from 'src/utils/MemCache';

const c = new MemCache('useMemCache');
const c1 = new MemCache('useMemCache-fetchFlag'); // 防止缓存击穿，记录fetching情况

export function useMemCache<T>(
  key: string, // 唯一标识这个资源的key
  valueGetter: () => Promise<T>, // 这个资源的异步获取函数
  expire: number = MemCache.EXPIRE_TIME.ONE_HOUR // 过期时间（秒）;0表示不过期
) {
  const hasCache = c.has(key);
  const cacheNow = c.get(key);
  const [v, setV] = useState<T | undefined>(undefined);
  useEffect(() => {
    if (hasCache) {
      setV(cacheNow);
    } else {
      if (!c1.has(key)) {
        c1.set(key, true, 0);
        valueGetter()
          .then((value) => {
            c.set(key, value, expire);
            setV(value);
          })
          .catch(() => {
            console.warn('useMemCache 重载数据失败', key);
          })
          .finally(() => {
            c1.pop(key);
          });
      }
    }
  }, [expire, key, hasCache, valueGetter, cacheNow]);
  return v;
}
