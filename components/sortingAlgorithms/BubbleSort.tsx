import { sortingProps } from '../../types';
import { useRef } from 'react';

const BubbleSort = ({
  primaryArray,
  setPrimaryArray,
  setIsSorting,
  setCurrentIndex,
  setTestIndex,
  isSorting,
  speed,
  pauseRef,
  setCurrentSelection,
  pause,
  stop,
}: sortingProps) => {
  const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  //bubbleSort
  const bubbleSort = async (arr: number[]) => {
    stop.current = false;
    pauseRef.current = false;
    setIsSorting(true);
    setCurrentSelection('Bubble Sort');
    let newArr = [...arr];
    //loop through whole array
    for (let i = 0; i < newArr.length; i++) {
      await timeout(
        primaryArray.length < 20
          ? speed[primaryArray.length][0] * 2
          : speed[primaryArray.length][0]
      );
      //loop through array again testing currentValue against next value in array
      for (let j = 0; j < newArr.length; j++) {
        await pause();
        if (stop.current === true) return;
        setTestIndex([j + 1]);
        setCurrentIndex([j]);

        //if the next value is bigger set the current value to the bigger value
        if (newArr[j] > newArr[j + 1]) {
          //swap values as we go through the array
          [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
        }
        let setArr = [...newArr];
        await timeout(speed[primaryArray.length][1]);
        setTestIndex([j + 1]);
        setCurrentIndex([j]);
        setPrimaryArray(setArr);
        // update displayed array
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
