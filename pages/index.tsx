import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import SelectionSort from '../components/sortingAlgorithms/SelectionSort';
import BubbleSort from '../components/sortingAlgorithms/BubbleSort';
import MergeSort from '../components/sortingAlgorithms/MergeSort';
import FlipMove from 'react-flip-move';

const Home: NextPage = () => {
  const [primaryArray, setPrimaryArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number[]>([]);
  const [testIndex, setTestIndex] = useState<number[]>([]);

  // generate new array function
  const generateArray = () => {
    const generatedArray: number[] = Array.from(
      { length: Math.floor(Math.random() * 50 + 30) },
      () => Math.floor(Math.random() * 500 + 1)
    );
    return generatedArray;
  };

  // function to shuffle current array
  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  };

  const resetArray = () => {
    let shuffled = primaryArray && shuffleArray(primaryArray);
    setPrimaryArray(shuffled);
    setCurrentIndex([]);
    setTestIndex([]);
    return;
  };

  useEffect(() => {
    const generatedArray: number[] = generateArray();
    setIsSorting(false);
    setPrimaryArray(generatedArray);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row items-end justify-center p-3 m-2 border-2 border-black h-[550px]">
        <FlipMove
          className="flex flex-row items-end justify-center p-3 m-2 border-2 border-black h-[550px]"
          enterAnimation="accordionHorizontal"
          leaveAnimation="accordionHorizontal"
        >
          {primaryArray?.map((element: number, index: number) =>
            currentIndex?.includes(index) ? (
              <div
                key={index}
                className={`w-2 m-1 text-center bg-green-500 `}
                style={{ height: `${element}px` }}
              ></div>
            ) : testIndex?.includes(index) ? (
              <div
                key={index}
                className={`w-2 m-1 text-center bg-red-600 `}
                style={{ height: `${element}px` }}
              ></div>
            ) : (
              <div
                key={index}
                className={`w-2 m-1 text-center bg-slate-300 `}
                style={{ height: `${element}px` }}
              ></div>
            )
          )}
        </FlipMove>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-row pr-2 mr-2 border-r-2 border-black">
          <button
            onClick={() => setPrimaryArray(generateArray)}
            className="inline-block  rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
            disabled={isSorting}
          >
            <span className="block px-8 py-3 text-sm font-medium bg-white rounded-full hover:bg-transparent">
              Generate array
            </span>
          </button>
          <button
            onClick={resetArray}
            className="inline-block rounded-full bg-gradient-to-r  from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
            disabled={isSorting}
          >
            <span className="block px-8 py-3 text-sm font-medium bg-white rounded-full hover:bg-transparent">
              randomize
            </span>
          </button>
        </div>
        <SelectionSort
          setPrimaryArray={setPrimaryArray}
          primaryArray={primaryArray}
          setIsSorting={setIsSorting}
          setCurrentIndex={setCurrentIndex}
          setTestIndex={setTestIndex}
          isSorting={isSorting}
        />
        <BubbleSort
          setPrimaryArray={setPrimaryArray}
          primaryArray={primaryArray}
          setIsSorting={setIsSorting}
          setCurrentIndex={setCurrentIndex}
          setTestIndex={setTestIndex}
          isSorting={isSorting}
        />
        <MergeSort
          setPrimaryArray={setPrimaryArray}
          primaryArray={primaryArray}
          setIsSorting={setIsSorting}
          setCurrentIndex={setCurrentIndex}
          setTestIndex={setTestIndex}
          isSorting={isSorting}
        />
      </div>
    </div>
  );
};

export default Home;
