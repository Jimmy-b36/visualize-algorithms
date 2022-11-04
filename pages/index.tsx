import type { NextPage } from 'next';
import { useEffect, useState, useRef } from 'react';
import SelectionSort from '../components/sortingAlgorithms/SelectionSort';
import BubbleSort from '../components/sortingAlgorithms/BubbleSort';
import MergeSort from '../components/sortingAlgorithms/MergeSort';
import InsertionSort from '../components/sortingAlgorithms/InsertionSort';
import { sortingProps } from '../types';

const Home: NextPage = () => {
  const [primaryArray, setPrimaryArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number[]>([]);
  const [testIndex, setTestIndex] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(10);
  const [currentSelection, setCurrentSelection] = useState<string>('');

  const speed: sortingProps['speed'] = {
    80: [50, 5],
    60: [100, 20],
    40: [200, 75],
    20: [300, 200],
    10: [300, 300],
  };

  const arraySizeOption: { [key: number]: string } = {
    10: '100px',
    20: '50px',
    40: '20px',
    60: '10px',
    80: '5px',
  };

  const stop = useRef(false);
  const resolvePointer = useRef<() => void>(() => {});

  const pause = () => {
    return new Promise<void>(resolve => {
      resolvePointer.current = resolve;
      if (stop.current) {
        setIsSorting(false);
      } else resolve();
    });
  };

  const resume = () => {
    resolvePointer.current();
    setIsSorting(true);
    stop.current = false;
  };

  const sortProps: sortingProps = {
    setPrimaryArray,
    primaryArray,
    setIsSorting,
    setCurrentIndex,
    setTestIndex,
    isSorting,
    speed,
    stop,
    setCurrentSelection,
    pause,
  };

  // generate new array function
  const generateArray = () => {
    const generatedArray: number[] = Array.from(
      { length: Math.floor(Math.random() + arraySize) },
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
    setCurrentSelection('');
    return;
  };

  useEffect(() => {
    const generatedArray: number[] = generateArray();
    setIsSorting(false);
    setPrimaryArray(generatedArray);
    setCurrentIndex([]);
    setTestIndex([]);
  }, [arraySize]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row">
        <div className="flex flex-row pr-2 mr-2 border-r-2 border-black">
          <div className="flex flex-col items-center justify-center">
            <p>Array size & speed</p>
            <fieldset className="flex flex-wrap gap-3">
              <legend className="sr-only">Array size</legend>

              <div>
                <input
                  type="radio"
                  name="arraySizeOption"
                  value={10}
                  id="sizeTen"
                  className="hidden peer"
                  onChange={() => setArraySize(10)}
                  disabled={isSorting}
                  checked={arraySize == 10}
                />

                <label
                  htmlFor="sizeTen"
                  className="flex items-center justify-center px-3 py-2 text-gray-900 border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                >
                  <p className="text-sm font-medium">10</p>
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="arraySizeOption"
                  value={20}
                  id="sizeTwenty"
                  className="hidden peer"
                  onChange={() => setArraySize(20)}
                  disabled={isSorting}
                />

                <label
                  htmlFor="sizeTwenty"
                  className="flex items-center justify-center px-3 py-2 text-gray-900 border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                >
                  <p className="text-sm font-medium">20</p>
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="arraySizeOption"
                  value={40}
                  id="sizeForty"
                  className="hidden peer"
                  onChange={() => setArraySize(40)}
                  disabled={isSorting}
                />

                <label
                  htmlFor="sizeForty"
                  className="flex items-center justify-center px-3 py-2 text-gray-900 border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                >
                  <p className="text-sm font-medium">40</p>
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="arraySizeOption"
                  value={60}
                  id="sizeSixty"
                  className="hidden peer"
                  onChange={() => setArraySize(60)}
                  disabled={isSorting}
                />

                <label
                  htmlFor="sizeSixty"
                  className="flex items-center justify-center px-3 py-2 text-gray-900 border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                >
                  <p className="text-sm font-medium">60</p>
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="arraySizeOption"
                  value={80}
                  id="sizeEighty"
                  className="hidden peer"
                  onChange={() => setArraySize(80)}
                  disabled={isSorting}
                />

                <label
                  htmlFor="sizeEighty"
                  className="flex items-center justify-center px-3 py-2 text-gray-900 border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                >
                  <p className="text-sm font-medium">80</p>
                </label>
              </div>
            </fieldset>
          </div>
          <button
            onClick={resetArray}
            className="inline-block rounded-full bg-gradient-to-r  mx-1 from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
            disabled={isSorting}
          >
            <span className="block h-full px-8 py-5 text-sm font-medium bg-white rounded-full hover:bg-transparent">
              Reset
            </span>
          </button>
          <button
            className="inline-block rounded-full bg-gradient-to-r  mx-1 from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
            onClick={() => {
              stop.current ? resume() : (stop.current = !stop.current);
            }}
          >
            <span className="block h-full px-8 py-5 text-sm font-medium bg-white rounded-full hover:bg-transparent">
              Play/Pause
            </span>
          </button>
        </div>

        <SelectionSort {...sortProps} />
        <BubbleSort {...sortProps} />
        <MergeSort {...sortProps} />
        <InsertionSort {...sortProps} />
      </div>
      <div className="m-2 text-xl underline bold">
        Current selection: {currentSelection}
      </div>
      <div className="flex flex-row items-end justify-center p-3 m-2 border-2 border-black h-[550px]">
        {primaryArray?.map((element: number, index: number) =>
          currentIndex?.includes(index) ? (
            <div
              key={index}
              className={`${
                arraySize < 20 ? 'mx-3' : 'mx-1'
              }  flex justify-center my-1 items-end border border-black bg-green-500`}
              style={{
                height: `${element}px`,
                width: arraySizeOption[arraySize],
              }}
            >
              {arraySize < 40 ? element : null}
            </div>
          ) : testIndex?.includes(index) ? (
            <div
              key={index}
              className={`${
                arraySize < 20 ? 'mx-5' : 'mx-1'
              } flex justify-center my-1 items-end border border-black bg-red-600 `}
              style={{
                height: `${element}px`,
                width: arraySizeOption[arraySize],
              }}
            >
              {arraySize < 40 ? element : null}
            </div>
          ) : (
            <div
              key={index}
              className={`m-1  flex justify-center items-end border border-black bg-slate-300 `}
              style={{
                height: `${element}px`,
                width: arraySizeOption[arraySize],
              }}
            >
              {arraySize < 40 ? element : null}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
