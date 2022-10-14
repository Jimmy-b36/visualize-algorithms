import { useEffect, useState } from 'react';
let data: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50,
];
const Test = () => {
  const [array, setArray] = useState<number[]>();
  const [clicked, setClicked] = useState<boolean>();
  const [steps, setSteps] = useState<number>(0);

  const selectionSort = (arr: number[]) => {
    const result: number[] = [];

    const x: NodeJS.Timer = setInterval((i: number = arr.length) => {
      if (i === 0) return clearInterval(x);
      result.push(Math.min(...arr));
      arr.splice(arr.indexOf(Math.min(...arr)), 1);
      setArray([...array.concat(result)]);
      i--;
    }, 100);

    return result;
  };

  const bubbleSort = (arr: number[]) => {
    arr = shuffleArray(arr);
    const x: NodeJS.Timer = setInterval((i = 0) => {
      if (i >= arr.length) return clearInterval(x);
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] > arr[j + 1]) {
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
          let newArr = arr;
          setArray([...newArr]);
          let newSteps = steps;
          newSteps += i * j;
          setSteps(newSteps);
        } else i++;
      }
    }, 100);

    return arr;
  };

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
    let shuffled = array && shuffleArray(array);
    setSteps(0);
    setArray(shuffled);
  }, [clicked]);

  useEffect(() => {
    setArray(shuffleArray(data));
  }, []);

  return (
    <div className="flex flex-row items-end w-full">
      {array?.map(element => (
        <div key={element} className={`w-6 h-[${element * 10}px] bg-slate-300`}>
          {element}
        </div>
      ))}
      <button
        onClick={() => selectionSort(array)}
        className="inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
      >
        <span className="block px-8 py-3 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          Selection sort
        </span>
      </button>
      <button
        onClick={() => bubbleSort(array)}
        className="inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
      >
        <span className="block px-8 py-3 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          Bubble sort
        </span>
      </button>
      <button
        onClick={() => setClicked(clicked ? false : true)}
        className="inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
      >
        <span className="block px-8 py-3 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          reset
        </span>
      </button>
      <div>{steps}</div>
    </div>
  );
};

export default Test;
