import { PredictTag } from 'src/types/main';
import { hasChineseStr } from 'src/utils/miscs';
import danTags from 'src/pages/tag/main/sections/danTagsFixed';

// 消息分发至函数
self.onmessage = async function (event: MessageEvent) {
  const { id, type, data } = event.data;
  const reply = (answer: unknown) => {
    self.postMessage({ id, data: answer });
  };
  const action = actions[type as keyof typeof actions];
  if (action) {
    const answer = await action(data);
    reply(answer);
  }
};

// 框架要求作导出声明
export const _ = 'WORKER';

// 处理函数集合
const actions = {
  test: (data: unknown) => {
    console.log('test:', data);
    return 'passed';
  },

  // 标签预测
  tagPredict: (text: string): PredictTag[] => {
    if (!text) return [];
    const isZh = hasChineseStr(text);
    return danTags
      .filter((t) => {
        if (isZh) {
          return t.name.includes(text);
        }
        return [t.value, ...t.alias].join(', ').includes(text);
      })
      .map((t) => {
        return {
          en: t.value,
          cn: t.name,
          count: t.count,
          r18: t.restricted ? 1 : 0,
        };
      });
  },
};
