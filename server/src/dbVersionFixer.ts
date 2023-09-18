// 对版本不一致的数据文件进行修复

export function fixer(
  version: number,
  changeData: (recipe: (base: unknown) => void) => void
) {
  if (version === 1) {
    changeData(v1ToV2);
    return fixer(2, changeData);
  }
  // if (version === 2) {
  //   changeData(v2ToV3);
  //   return fixer(3, changeData);
  // }
}

function v1ToV2(data: any) {}

function v2ToV3(data: any) {}
