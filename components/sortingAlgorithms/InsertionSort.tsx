import { sortingProps } from '../../types';
const InsertionSort = ({
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

  // insertionSort
  const insertionSort = async (arr: number[]) => {
    stop.current = false;
    pauseRef.current = false;
    setIsSorting(true);

    let newArr = [...arr];
    // outer loop through array
    for (let i = 0; i < arr.length; i++) {
      await timeout(speed[primaryArray.length][0]);
      for (let j = i; j > 0; j--) {
        await pause();
        if (stop.current === true) return;

        setCurrentIndex([j]);
        setTestIndex([j - 1]);

        if (newArr[j] < newArr[j - 1]) {
          [newArr[j], newArr[j - 1]] = [newArr[j - 1], newArr[j]];
          let newStep = [...newArr];
          // setting our primary array to display each step
          await timeout(speed[primaryArray.length][1]);
          setPrimaryArray([...newStep]);
        }

        await timeout(speed[primaryArray.length][1]);
        setCurrentIndex([j - 1]);
        setTestIndex([j - 2]);
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
        onClick={() => {
          insertionSort(primaryArray);
          setCurrentSelection('Insertion Sort');
        }}
        className="inline-block  rounded-full bg-gradient-to-r h-full from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
        disabled={isSorting}
      >
        <span className="block px-8 py-5 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          Insertion sort
        </span>
      </button>
    </div>
  );
};

export default InsertionSort;
