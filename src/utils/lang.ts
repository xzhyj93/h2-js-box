let lang = '';

export function updateLang(l: string) {
  lang = l;
}

export const LANG_TYPE = {
  EN: 'en',
  CN: 'zh-CN',
};

const langText: any = {
  demo: {
    [LANG_TYPE.EN]: 'Demo',
    [LANG_TYPE.CN]: '示例',
  },
  local: {
    [LANG_TYPE.EN]: 'Local',
    [LANG_TYPE.CN]: '本地',
  },
  quicksort: {
    [LANG_TYPE.EN]: 'Quick Sort',
    [LANG_TYPE.CN]: '快排',
  },
  url2json: {
    [LANG_TYPE.EN]: 'Url params to JSON',
    [LANG_TYPE.CN]: 'Url参数转JSON',
  },
  randomStrGenerator: {
    [LANG_TYPE.EN]: 'Random string generator',
    [LANG_TYPE.CN]: '随机字符串生成',
  },
  notice: {
    [LANG_TYPE.CN]:
      '请使用 print() 函数输出结果，用法类似 console.log；可参考示例代码。',
    [LANG_TYPE.EN]:
      'Please use the print () function output result, usage similar to console.log. Refer to sample code',
  },

  help: {
    [LANG_TYPE.EN]: 'More help',
    [LANG_TYPE.CN]: '更多帮助',
  },
  clear: {
    [LANG_TYPE.EN]: 'Clear',
    [LANG_TYPE.CN]: '清空',
  },
  run: {
    [LANG_TYPE.EN]: 'Run',
    [LANG_TYPE.CN]: '执行',
  },
  noDuplicate: {
    [LANG_TYPE.EN]: 'The file name cannot be repeated with the file exsited!',
    [LANG_TYPE.CN]: '文件名不可与已有文件重复！',
  },
};
export default function getLangText(key: string) {
  return langText[key]?.[lang];
}
