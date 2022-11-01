import { Dispatch, SetStateAction } from 'react';

import { sortingProps } from '../../types';

const BubbleSort = ({
  primaryArray,
  setPrimaryArray,
  setIsSorting,
  setCurrentIndex,
  setTestIndex,
  isSorting,
}: sortingProps) => {
  // timeout function for merge sort
  const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  //bubbleSort
  const bubbleSort = async (arr: number[]) => {
    setIsSorting(true);
    let newArr = [...arr];
    //loop through whole array
    for (let i = 0; i < newArr.length; i++) {
      await timeout(100);
      //loop through array again testing currentValue against next value in array
      for (let j = 0; j < newArr.length; j++) {
        //if the next value is bigger set the current value to the bigger value
        if (newArr[j] > newArr[j + 1]) {
          //swap values as we go through the array
          let tmp = newArr[j];
          newArr[j] = newArr[j + 1];
          newArr[j + 1] = tmp;
          let setArr = [...newArr];
          // update displayed array
          await timeout(primaryArray.length > 60 ? 10 : 500);
          setTestIndex([j + 2]);
          setCurrentIndex([j + 1]);
          setPrimaryArray(setArr);
        }
      }
    }
    const setComplete = Array.from(
      { length: newArr.length },
      (x: number, k: number) => k
    );
    setCurrentIndex(setComplete);
    setIsSorting(false);
    return;
  };

  return (
    <div>
      <button
        onClick={() => bubbleSort(primaryArray)}
        className={`inline-block  rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 `}
        disabled={isSorting}
      >
        <span className="block px-8 py-3 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          Bubble sort
        </span>
      </button>
    </div>
  );
};

export default BubbleSort;
