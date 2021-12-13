import { IDemo } from '../types';

export const demos: IDemo[] = [
  {
    title: '快排',
    id: 'demo-quicksort',
    content: `
/**
* title: 快排
*/
function swap(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function quickSort(arr, left = 0, right) {
  right = right === undefined ? arr.length - 1 : right

  let i = left
  let j = right
  let base = arr[left]

  if (i >= j) {
    return
  }

  while (i < j) {
    while(arr[j] > base && i < j) {
      j--
    }

    while(arr[i] <= base && i < j) {
      i++
    }

    if (i < j){
      swap(arr, i, j)
    }
  }

  arr[left] = arr[i]
  arr[i] = base
  quickSort(arr, left, i - 1)
  quickSort(arr, i + 1, right)
}

const arr = []
for (let i = 0; i < 20; i++) {
  arr.push(parseInt(Math.random() * 100))
}
print('排序前：', arr)
quickSort(arr)
print('排序后：', arr)
    `,
  },
  {
    title: 'url参数转JSON',
    id: 'demo-url2json',
    content: `
/**
* title: url参数转json
*/
function listToJson(str) {
  const list = str.split('&');
  const obj = list.reduce((acc, item) => {
    const [key, value] = item.split('=')
    acc[key] = value;
    return acc;
  }, {})

  return obj;
}

const str1 = '/demo?a=1&b=2&c=333&d={123}'
print((listToJson(str1)))
    `,
  },
  {
    title: '随机字符串生成',
    id: 'demo-randomStrGenerator',
    content: `
/**
 * 使用指定字符集中的字符生成指定长度的随机字符串。可用于生成随机密码等操作
 */
function randomString(length, chars) {
  let result = '';
  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

const charSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'
print(randomString(12, charSet));
    `,
  },
];
