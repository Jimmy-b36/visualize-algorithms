import { useEffect, useState } from 'react';

const data: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50,
];

const Test = () => {
  const [array, setArray] = useState<number[]>([]);

  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  };

  const selectionSort = (arr: number[]) => {
    arr = shuffleArray(arr);
    const result: number[] = [];
    for (let i = arr.length; i > 0; i--) {
      setArray(result);
      result.push(Math.min(...arr));
      arr.splice(arr.indexOf(Math.min(...arr)), 1);
    }
    return result;
  };

  useEffect(() => {
    selectionSort(data);
  }, []);

  return (
    <div className="w-full flex flex-row items-end">
      {array.map(element => (
        <div key={element} className={`w-6 h-[${element * 10}px] bg-slate-300`}>
          {element}
        </div>
      ))}
    </div>
  );
};

export default Test;
