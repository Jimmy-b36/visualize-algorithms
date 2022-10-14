const mergeSort = require('../helpers/sorting').mergeSort;
const selectionSort = require('../helpers/sorting').selectionSort;
const bubbleSort = require('../helpers/sorting').bubbleSort;

test('selectionSort', () => {
  const data = [4, 8, 2, 9, 11, 12, 15, 42, 100];
  expect(selectionSort(data)).toEqual([2, 4, 8, 9, 11, 12, 15, 42, 100]);
});

test('bubbleSort', () => {
  const data = [4, 8, 2, 9, 11, 12, 15, 42, 100];
  expect(bubbleSort(data)).toEqual([2, 4, 8, 9, 11, 12, 15, 42, 100]);
});

test('mergeSort', () => {
  const data1 = [2, 4, 8, 9, 11, 12, 15, 42, 100];
  const data2 = [1, 3, 6, 8, 11, 12];
  expect(mergeSort(data1, data2)).toEqual([
    1, 2, 3, 4, 6, 8, 8, 9, 11, 11, 12, 12, 15, 42, 100,
  ]);
});
