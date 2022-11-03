import { sortingProps } from '../../types';

const SelectionSort = ({
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

  // selectionSort
  const selectionSort = async (arr: number[]) => {
    setIsSorting(true);

    let newArr = [...arr];
    // outer loop through array
    for (let i = 0; i < arr.length - 1; i++) {
      await timeout(speed[primaryArray.length][0]);
      // inner loop through array to find smallest value
      for (let j = i + 1; j < arr.length; j++) {
        // if arr[j] is smaller than arr[i] swap them, arr[i] is now the smallest value
        if (newArr[i] > newArr[j]) {
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];

          let newStep = [...newArr];
          // setting our primary array to display each step
          await timeout(speed[primaryArray.length][1]);
          setPrimaryArray([...newStep]);
        }
        await timeout(speed[primaryArray.length][1]);
        setCurrentIndex([i]);
        setTestIndex([j]);
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
        onClick={() => selectionSort(primaryArray)}
        className="inline-block  rounded-full bg-gradient-to-r mx-1 h-full from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
        disabled={isSorting}
      >
        <span className="block px-8 py-5 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          Selection sort
        </span>
      </button>
    </div>
  );
};

export default SelectionSort;
