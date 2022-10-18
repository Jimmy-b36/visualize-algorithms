const mergeSort = (arr1: number[], arr2: number[]) => {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] === arr2[j]) {
      result.push(arr1[i]);
      result.push(arr2[j]);
      j++;
      i++;
    }
    if (arr1[i] > arr2[j]) {
      result.push(arr2[j]);
      j++;
    } else {
      result.push(arr1[i]);
      i++;
    }
  }
  i === arr1.length ? result.push(arr2.splice(j)) : result.push(arr1.splice(i));

  return result.flat();
};

// console.log(mergeSort([2, 4, 5, 7, 10, 18, 30], [1, 3, 6, 8, 11, 12]));

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

const data = [4, 8, 2, 9, 11, 12, 15, 42, 100];

// console.log('selectionSort -> ', selectionSort(data));

export { mergeSort, selectionSort, bubbleSort };
