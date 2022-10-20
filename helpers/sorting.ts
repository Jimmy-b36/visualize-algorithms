const mergeSort = (arr: number[]) => {
  const newArr: number[] = [...arr];
  if (newArr.length === 1) return newArr;
  const mid = Math.floor(newArr.length / 2);
  const leftArr: number[] = mergeSort(newArr.slice(0, mid));
  const rightArr: number[] = mergeSort(newArr.slice(mid));
  return merge(leftArr, rightArr);
};

const merge = (leftArr: number[], rightArr: number[]) => {
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

const selectionSort = (arr: number[]) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    let tmp = arr[minIdx];
    arr[minIdx] = arr[i];
    arr[i] = tmp;
  }
  return arr;
};

const bubbleSort = (arr: number[]) => {
  arr = shuffleArray(arr);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        arr.splice(j + 2, 0, arr[j]);
        arr.splice(j, 1);
      } else {
        continue;
      }
    }
  }
  return arr;
};

const shuffleArray = (arr: number[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
};

const data = [1, 3, 6, 8, 11, 2, 5, 10];

// console.log('mergeSort -> ', mergeSort(data));

export { mergeSort, selectionSort, bubbleSort };
