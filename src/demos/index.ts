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
];
