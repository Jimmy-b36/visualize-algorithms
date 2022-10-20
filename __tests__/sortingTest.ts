const mergeSort = require('../helpers/sortingAlgorithms').mergeSort;
const selectionSort = require('../helpers/sortingAlgorithms').selectionSort;
const bubbleSort = require('../helpers/sortingAlgorithms').bubbleSort;

const data: number[][] = [];
for (let i = 0; i < 10; i++) {
  data.push(
    Array.from({ length: Math.floor(Math.random() * 40) }, () =>
      Math.floor(Math.random() * 40)
    )
  );
}
test('selectionSort', () => {
  data.forEach((item: number[]) => {
    expect(selectionSort(item)).toEqual(item.sort((a, b) => a - b));
  });
});

test('bubbleSort', () => {
  data.forEach((item: number[]) => {
    expect(bubbleSort(item)).toEqual(item.sort((a, b) => a - b));
  });
});

test('mergeSort', () => {
  data.forEach((item: number[]) => {
    expect(mergeSort(item)).toEqual(item.sort((a, b) => a - b));
  });
});

// test('insertionSort', () => {
//   const data: number[] = [24, 76, 10, 73, 18];
//   expect(insertionSort(data)).toEqual([10, 18, 24, 73, 76]);
// });
export {};
