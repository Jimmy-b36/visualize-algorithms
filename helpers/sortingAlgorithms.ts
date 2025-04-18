function* mergeSortHelper(
  arr: number[],
  start: number,
  end: number
): Generator<number[], void, unknown> {
  if (start >= end) {
    return;
  }

  const mid = Math.floor((start + end) / 2);

  // Recursively sort the left and right halves
  yield* mergeSortHelper(arr, start, mid);
  yield* mergeSortHelper(arr, mid + 1, end);

  // Merge the sorted halves
  yield* mergeGenerator(arr, start, mid, end);
}

export function* mergeSort(arr: number[]): Generator<number[], void, unknown> {
  yield arr.slice();
  yield* mergeSortHelper(arr, 0, arr.length - 1);
  yield arr.slice();
}

function* mergeGenerator(
  arr: number[],
  start: number,
  mid: number,
  end: number
): Generator<number[], void, unknown> {
  const leftArray = arr.slice(start, mid + 1);
  const rightArray = arr.slice(mid + 1, end + 1);

  let leftIndex = 0;
  let rightIndex = 0;
  let mergeIndex = start;

  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    if (leftArray[leftIndex] <= rightArray[rightIndex]) {
      arr[mergeIndex] = leftArray[leftIndex];
      leftIndex++;
    } else {
      arr[mergeIndex] = rightArray[rightIndex];
      rightIndex++;
    }
    mergeIndex++;
    yield arr.slice(); // Yield state after placing one element
  }

  // Copy any remaining elements from the left array
  while (leftIndex < leftArray.length) {
    arr[mergeIndex] = leftArray[leftIndex];
    leftIndex++;
    mergeIndex++;
    yield arr.slice(); // Yield state after placing remaining left element
  }

  // Copy any remaining elements from the right array
  while (rightIndex < rightArray.length) {
    arr[mergeIndex] = rightArray[rightIndex];
    rightIndex++;
    mergeIndex++;
    yield arr.slice(); // Yield state after placing remaining right element
  }
}

export interface BubbleSortState {
  array: number[];
  comparing: [number, number] | null;
  swapped: boolean;
}

export function* bubbleSort(
  arr: number[]
): Generator<BubbleSortState, void, unknown> {
  let localArr = arr.slice(); // Work on a copy
  yield { array: localArr.slice(), comparing: null, swapped: false }; // Initial state

  let swappedOccurred;
  for (let i = 0; i < localArr.length; i++) {
    swappedOccurred = false;
    for (let j = 0; j < localArr.length - 1 - i; j++) {
      // Yield state *before* potential swap, highlighting comparison
      yield { array: localArr.slice(), comparing: [j, j + 1], swapped: false };

      if (localArr[j] > localArr[j + 1]) {
        [localArr[j], localArr[j + 1]] = [localArr[j + 1], localArr[j]];
        swappedOccurred = true;
        // Yield state *after* swap, highlighting the same indices
        yield { array: localArr.slice(), comparing: [j, j + 1], swapped: true };
      }
    }

    if (!swappedOccurred) {
      break;
    }
  }
  // Yield final state, clear highlights
  yield { array: localArr.slice(), comparing: null, swapped: false };
}

// Selection Sort Generator
export function* selectionSort(
  arr: number[]
): Generator<number[], void, unknown> {
  yield arr.slice();
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      // Only swap if minIdx changed
      [arr[minIdx], arr[i]] = [arr[i], arr[minIdx]];
      yield arr.slice(); // Yield state after swap
    }
  }
  yield arr.slice(); // Yield final state
}

// Insertion Sort Generator
export function* insertionSort(
  arr: number[]
): Generator<number[], void, unknown> {
  yield arr.slice();
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;
    let shifted = false;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
      shifted = true;
      yield arr.slice();
    }
    if (shifted) {
      arr[j + 1] = current;
      yield arr.slice();
    }
  }
  yield arr.slice();
}

const shuffleArray = (arr: number[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};
