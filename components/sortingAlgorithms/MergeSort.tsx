import { Dispatch, SetStateAction } from 'react';

const MergeSort = (props: {
  primaryArray: number[];
  setPrimaryArray: Dispatch<SetStateAction<number[]>>;
  setIsSorting: Dispatch<SetStateAction<boolean>>;
}) => {
  // timeout function for merge sort
  const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  // Iterative merge sort
  const mergeSort = async (arr: number[]) => {
    //Create two arrays for sorting
    let sorted: number[] = [...arr];
    let n: number = sorted.length;
    let buffer: number[] = new Array(n);

    for (let size = 1; size < n; size *= 2) {
      for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
        //Get the two sub arrays
        let left = leftStart,
          right = Math.min(left + size, n),
          leftLimit = right,
          rightLimit = Math.min(right + size, n);

        //Merge the sub arrays

        merge(left, right, leftLimit, rightLimit, sorted, buffer);
      }

      //Swap the sorted sub array and merge them
      await timeout(1000);
      let temp = sorted;
      sorted = buffer;
      buffer = temp;
      let newStep = [...sorted];
      props.setPrimaryArray(newStep);
    }

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
    await timeout(250);
    let i = left;

    //Compare the two sub arrays and merge them in the sorted order
    while (left < leftLimit && right < rightLimit) {
      if (sorted[left] <= sorted[right]) {
        buffer[i++] = sorted[left++];
      } else {
        buffer[i++] = sorted[right++];
      }
    }
    await timeout(250);
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
        onClick={() => mergeSort(props.primaryArray)}
        className="inline-block  rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
      >
        <span className="block px-8 py-3 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          Merge sort
        </span>
      </button>
    </div>
  );
};

export default MergeSort;
