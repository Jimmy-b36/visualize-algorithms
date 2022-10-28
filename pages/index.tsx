import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import SelectionSort from '../components/sortingAlgorithms/SelectionSort';
import BubbleSort from '../components/sortingAlgorithms/BubbleSort';
import MergeSort from '../components/sortingAlgorithms/MergeSort';

const Home: NextPage = () => {
  const [primaryArray, setPrimaryArray] = useState<number[]>([]);
  const [reset, setReset] = useState<boolean>(false);

  // generate new array function
  const generateArray = () => {
    const generatedArray: number[] = Array.from(
      { length: Math.floor(Math.random() * 40) },
      () => Math.floor(Math.random() * 40 + 1)
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

  useEffect(() => {
    let shuffled = primaryArray && shuffleArray(primaryArray);
    setPrimaryArray(shuffled);
  }, [reset]);

  useEffect(() => {
    const generatedArray: number[] = generateArray();
    setPrimaryArray(generatedArray);
  }, []);

  return (
    <div className="flex flex-row items-end w-full">
      {primaryArray?.map((element: number) => (
        <div
          key={Math.random() * 100}
          className={`w-10 m-1 text-center h-[${element * 10}px] bg-slate-300 `}
        >
          {element}
        </div>
      ))}

      <button
        onClick={() => setPrimaryArray(generateArray)}
        className="inline-block  rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
      >
        <span className="block px-8 py-3 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          Generate array
        </span>
      </button>
      <button
        onClick={() => setReset(reset ? false : true)}
        className="inline-block  rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
      >
        <span className="block px-8 py-3 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          reset
        </span>
      </button>
      <SelectionSort
        setPrimaryArray={setPrimaryArray}
        primaryArray={primaryArray}
      />
      <BubbleSort
        setPrimaryArray={setPrimaryArray}
        primaryArray={primaryArray}
      />
      <MergeSort
        setPrimaryArray={setPrimaryArray}
        primaryArray={primaryArray}
      />
    </div>
  );
};

export default Home;
