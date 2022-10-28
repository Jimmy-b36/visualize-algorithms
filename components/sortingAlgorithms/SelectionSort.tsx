import { Dispatch, SetStateAction } from 'react';

const SelectionSort = (props: {
  primaryArray: number[];
  setPrimaryArray: Dispatch<SetStateAction<number[]>>;
  setIsSorting: Dispatch<SetStateAction<boolean>>;
}) => {
  // selectionSort
  const selectionSort = (arr: number[]) => {
    props.setIsSorting(true);

    setTimeout(() => {
      let newArr = [...arr];
      // outer loop through array
      for (let i = 0; i < arr.length - 1; i++) {
        setTimeout(() => {
          // inner loop through array to find smallest value
          for (let j = i + 1; j < arr.length; j++) {
            // if arr[j] is smaller than arr[i] swap them, arr[i] is now the smallest value
            if (newArr[i] > newArr[j]) {
              let temp = newArr[i];
              newArr[i] = newArr[j];
              newArr[j] = temp;
              let newStep = [...newArr];
              // setting our primary array to display each step
              setTimeout(() => {
                props.setPrimaryArray([...newStep]);
              }, j * 10);
            }
          }
        }, i * 1000);
      }
    }, 500);
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
