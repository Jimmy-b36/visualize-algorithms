export const mergeSort = (arr: number[]) => {
  const newArr: number[] = [...arr];
  if (newArr.length === 0) return newArr;
  const mid = Math.floor(newArr.length / 2);
  const leftArr: number[] = mergeSort(newArr.slice(0, mid));
  const rightArr: number[] = mergeSort(newArr.slice(mid));
  const sortedArr: number[] = [];
  let i = 0;
  let j = 0;
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] < rightArr[j]) {
      sortedArr.push(leftArr[i++]);
    } else {
      sortedArr.push(rightArr[j++]);
    }
  }
  while (i < leftArr.length) sortedArr.push(leftArr[i++]);
  while (j < rightArr.length) sortedArr.push(rightArr[j++]);
  return sortedArr;
};
