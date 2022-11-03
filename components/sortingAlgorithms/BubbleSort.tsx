import { Dispatch, SetStateAction } from 'react';

import { sortingProps } from '../../types';

const BubbleSort = ({
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

  //bubbleSort
  const bubbleSort = async (arr: number[]) => {
    setIsSorting(true);
    let newArr = [...arr];
    //loop through whole array
    for (let i = 0; i < newArr.length; i++) {
      await timeout(speed[primaryArray.length][0] * 2);
      //loop through array again testing currentValue against next value in array
      for (let j = 0; j < newArr.length; j++) {
        setTestIndex([j + 1]);
        setCurrentIndex([j]);

        //if the next value is bigger set the current value to the bigger value
        if (newArr[j] > newArr[j + 1]) {
          //swap values as we go through the array
          [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];

          let setArr = [...newArr];
          // update displayed array
          await timeout(speed[primaryArray.length][1] * 2);
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
        className={`inline-block  rounded-full bg-gradient-to-r h-full from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 `}
        disabled={isSorting}
      >
        <span className="block px-8 py-5 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          Bubble sort
        </span>
      </button>
    </div>
  );
};

export default BubbleSort;
