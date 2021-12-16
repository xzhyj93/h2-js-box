import { IDemo } from '../types';
import getLangText from '../utils/lang';

export function demos() {
  return [
    {
      title: getLangText('quicksort'),
      id: 'demo-quicksort',
      content: `
  /**
  * 标题: 快排
  * title：QuickSort
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
  print('排序前/before sort：', arr)
  quickSort(arr)
  print('排序后/after sort：', arr)
      `,
    },
    {
      title: getLangText('url2json'),
      id: 'demo-url2json',
      content: `
  /**
  * 标题: url参数转json
  * title: Transfer url params to JSON
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
      title: getLangText('randomStrGenerator'),
      id: 'demo-randomStrGenerator',
      content: `
  /**
   * 功能：使用指定字符集中的字符生成指定长度的随机字符串。可用于生成随机密码等操作
   * Function: Generate a random string of the specified length by the characters in the specified character set. Can be used to generate a random password or the like
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
}
