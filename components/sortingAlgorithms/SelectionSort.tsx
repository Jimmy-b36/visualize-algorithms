import { Dispatch, SetStateAction } from 'react';

const SelectionSort = (props: {
  primaryArray: number[];
  setPrimaryArray: Dispatch<SetStateAction<number[]>>;
  setIsSorting: Dispatch<SetStateAction<boolean>>;
  setCurrentIndex: Dispatch<SetStateAction<number[]>>;
  setTestIndex: Dispatch<SetStateAction<number[]>>;
}) => {
  // timeout function for merge sort
  const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  // selectionSort
  const selectionSort = async (arr: number[]) => {
    props.setIsSorting(true);

    let newArr = [...arr];
    // outer loop through array
    for (let i = 0; i < arr.length - 1; i++) {
      await timeout(200);
      // inner loop through array to find smallest value
      for (let j = i + 1; j < arr.length; j++) {
        // if arr[j] is smaller than arr[i] swap them, arr[i] is now the smallest value
        if (newArr[i] > newArr[j]) {
          let temp = newArr[i];
          newArr[i] = newArr[j];
          newArr[j] = temp;
          let newStep = [...newArr];
          // setting our primary array to display each step
          await timeout(10);
          props.setPrimaryArray([...newStep]);
        }
        await timeout(10);
        props.setCurrentIndex([i]);
        props.setTestIndex([j]);
      }
    }
  };
  return (
    <div>
      <button
        onClick={() => selectionSort(props.primaryArray)}
        className="inline-block  rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
      >
        <span className="block px-8 py-3 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          Selection sort
        </span>
      </button>
    </div>
  );
};

export default SelectionSort;
