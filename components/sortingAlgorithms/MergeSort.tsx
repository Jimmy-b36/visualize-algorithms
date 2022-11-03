import { sortingProps } from '../../types';

const MergeSort = ({
  primaryArray,
  setPrimaryArray,
  setIsSorting,
  setCurrentIndex,
  setTestIndex,
  isSorting,
  speed,
}: sortingProps) => {
  // timeout function for merge sort
  const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  // Iterative merge sort
  const mergeSort = async (arr: number[]) => {
    setIsSorting(true);
    //Create two arrays for sorting
    let sorted: number[] = [...arr];
    let n: number = sorted.length;
    let buffer: number[] = new Array(n);

    for (let size = 1; size < n; size *= 2) {
      for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
        //Get the two sub arrays
        let left = leftStart;
        let right = Math.min(left + size, n);
        let leftLimit = right;
        let rightLimit = Math.min(right + size, n);

        //Merge the sub arrays

        await merge(left, right, leftLimit, rightLimit, sorted, buffer);
      }

      //Swap the sorted sub array and merge them
      let temp = sorted;
      sorted = buffer;
      buffer = temp;
      let newStep = [...sorted];
      setPrimaryArray(newStep);
    }
    setIsSorting(false);
    return sorted;
  };

  const merge = async (
    left: number,
    right: number,
    leftLimit: number,
    rightLimit: number,
    sorted: number[],
    buffer: number[]
  ) => {
    const arrRange = (start: number, stop: number, step: number) =>
      Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
      );

    let setCurrent = arrRange(left, rightLimit - 1, 1);
    setCurrentIndex(setCurrent);
    await timeout(speed[primaryArray.length][0]);
    let i = left;
    //Compare the two sub arrays and merge them in the sorted order
    while (left < leftLimit && right < rightLimit) {
      if (sorted[left] <= sorted[right]) {
        buffer[i++] = sorted[left++];
      } else {
        buffer[i++] = sorted[right++];
      }
    }

    await timeout(speed[primaryArray.length][0]);
    //If there are elements in the left sub array then add it to the result
    while (left < leftLimit) {
      buffer[i++] = sorted[left++];
    }

    //If there are elements in the right sub array then add it to the result
    while (right < rightLimit) {
      buffer[i++] = sorted[right++];
    }
    return sorted;
  };

  return (
    <div>
      <button
        onClick={() => mergeSort(primaryArray)}
        className="inline-block  rounded-full bg-gradient-to-r mx-1 h-full from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
        disabled={isSorting}
      >
        <span className="block px-8 py-5 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          Merge sort
        </span>
      </button>
    </div>
  );
};

export default MergeSort;
