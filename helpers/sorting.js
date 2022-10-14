const mergeSort = (arr1, arr2) => {
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

console.log(mergeSort([2, 4, 5, 7, 10, 18, 30], [1, 3, 6, 8, 11, 12]));

const selectionSort = arr => {
  arr = shuffleArray(arr);
  result = [];
  for (let i = arr.length; i > 0; i--) {
    result.push(Math.min(...arr));
    arr.splice(arr.indexOf(Math.min(...arr)), 1);
    setTimeout(() => {}, 1000);
  }
  return result;
};
const bubbleSort = arr => {
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

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

const data = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50,
];

// console.log('selectionSort -> ', selectionSort(data));
