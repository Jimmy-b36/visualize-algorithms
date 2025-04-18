export interface SortState {
  array: number[];
  comparing: number[] | null;
  swapped: boolean;
}

// --- Merge Sort (Iterative / Bottom-Up) ---
export function* mergeGenerator(
  arr: number[],
  start: number,
  mid: number,
  end: number
): Generator<SortState, void, unknown> {
  const leftArray = arr.slice(start, mid + 1);
  const rightArray = arr.slice(mid + 1, end + 1);

  let leftIndex = 0;
  let rightIndex = 0;
  let mergeIndex = start;

  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    yield {
      array: arr.slice(),
      comparing: [start + leftIndex, mid + 1 + rightIndex],
      swapped: false,
    };

    if (leftArray[leftIndex] <= rightArray[rightIndex]) {
      yield {
        array: arr.slice(),
        comparing: [start + leftIndex, mergeIndex],
        swapped: true,
      };
      arr[mergeIndex] = leftArray[leftIndex];
      leftIndex++;
    } else {
      yield {
        array: arr.slice(),
        comparing: [mid + 1 + rightIndex, mergeIndex],
        swapped: true,
      };
      arr[mergeIndex] = rightArray[rightIndex];
      rightIndex++;
    }
    mergeIndex++;
  }

  while (leftIndex < leftArray.length) {
    arr[mergeIndex] = leftArray[leftIndex];
    yield {
      array: arr.slice(),
      comparing: [start + leftIndex, mergeIndex],
      swapped: true,
    };
    leftIndex++;
    mergeIndex++;
  }

  while (rightIndex < rightArray.length) {
    arr[mergeIndex] = rightArray[rightIndex];
    yield {
      array: arr.slice(),
      comparing: [mid + 1 + rightIndex, mergeIndex],
      swapped: true,
    };
    rightIndex++;
    mergeIndex++;
  }

  yield {
    array: arr.slice(),
    comparing: Array.from({ length: end - start + 1 }, (_, i) => start + i),
    swapped: false,
  };
  yield { array: arr.slice(), comparing: null, swapped: false };
}

export function* mergeSort(arr: number[]): Generator<SortState, void, unknown> {
  const localArr = [...arr];
  const n = localArr.length;
  yield { array: localArr.slice(), comparing: null, swapped: false }; // Initial state

  for (
    let currentSize = 1;
    currentSize <= n - 1;
    currentSize = 2 * currentSize
  ) {
    for (let leftStart = 0; leftStart < n - 1; leftStart += 2 * currentSize) {
      let mid = Math.min(leftStart + currentSize - 1, n - 1);
      let rightEnd = Math.min(leftStart + 2 * currentSize - 1, n - 1);

      const mergeRange = Array.from(
        { length: rightEnd - leftStart + 1 },
        (_, i) => leftStart + i
      );
      yield { array: localArr.slice(), comparing: mergeRange, swapped: false };

      yield* mergeGenerator(localArr, leftStart, mid, rightEnd);
    }
  }

  yield { array: localArr.slice(), comparing: null, swapped: false }; // Final sorted state
}

// --- Selection Sort ---
export function* selectionSort(
  arr: number[]
): Generator<SortState, void, unknown> {
  const localArr = [...arr]; // Work on a copy
  yield { array: localArr, comparing: null, swapped: false }; // Initial state

  for (let i = 0; i < localArr.length - 1; i++) {
    yield { array: localArr, comparing: [i], swapped: false };

    let minIdx = i;
    for (let j = i + 1; j < localArr.length; j++) {
      yield { array: localArr.slice(), comparing: [j, minIdx], swapped: false };

      if (localArr[j] < localArr[minIdx]) {
        minIdx = j;
        yield { array: localArr, comparing: [i, minIdx], swapped: false };
      }
    }

    if (minIdx !== i) {
      yield { array: localArr, comparing: [i, minIdx], swapped: false };
      [localArr[minIdx], localArr[i]] = [localArr[i], localArr[minIdx]];
      yield { array: localArr, comparing: [i, minIdx], swapped: true };
    }

    // Yield state showing element i is now sorted (highlight i maybe?)
    yield { array: localArr, comparing: [i], swapped: false };
  }

  // Yield final state, clear highlights
  yield { array: localArr.slice(), comparing: null, swapped: false };
}

// --- Insertion Sort ---
export function* insertionSort(
  arr: number[]
): Generator<SortState, void, unknown> {
  const localArr = [...arr]; // Work on a copy
  yield { array: localArr, comparing: null, swapped: false }; // Initial state

  for (let i = 1; i < localArr.length; i++) {
    const current = localArr[i];
    yield { array: localArr, comparing: [i], swapped: false };
    let j = i - 1;
    while (j >= 0 && localArr[j] > current) {
      yield { array: localArr, comparing: [j, j + 1], swapped: false };
      localArr[j + 1] = localArr[j];
      yield { array: localArr, comparing: [j, j + 1], swapped: true };
      j--;
    }

    if (j + 1 !== i) {
      yield { array: localArr, comparing: [j + 1], swapped: false };
      localArr[j + 1] = current;
      yield { array: localArr, comparing: [j + 1], swapped: true };
    }
    yield { array: localArr, comparing: [j + 1], swapped: false };
  }

  yield { array: localArr, comparing: null, swapped: false };
}

export function* bubbleSort(
  arr: number[]
): Generator<SortState, void, unknown> {
  const localArr = [...arr];
  yield { array: localArr, comparing: null, swapped: false };

  let swappedOccurred;
  for (let i = 0; i < localArr.length; i++) {
    swappedOccurred = false;
    for (let j = 0; j < localArr.length - 1 - i; j++) {
      yield { array: localArr, comparing: [j, j + 1], swapped: false };

      if (localArr[j] > localArr[j + 1]) {
        [localArr[j], localArr[j + 1]] = [localArr[j + 1], localArr[j]];
        swappedOccurred = true;
        yield { array: localArr, comparing: [j, j + 1], swapped: true };
      }
    }

    if (!swappedOccurred) {
      break;
    }
  }
  yield { array: localArr, comparing: null, swapped: false };
}
