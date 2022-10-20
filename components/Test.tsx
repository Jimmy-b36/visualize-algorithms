import { useEffect, useState } from 'react';

let data: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25,
];
const Test = () => {
  const [primaryArray, setPrimaryArray] = useState<any>([]);
  const [reset, setReset] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [testValue, setTestValue] = useState<number>(0);

  // Iterative merge sort
  const mergeSort = (arr: number[]) => {
    //Create two arrays for sorting
    let sorted: number[] = [...arr];
    let n: number = sorted.length;
    let buffer: number[] = new Array(n);

    for (let size = 1; size < n; size *= 2) {
      for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
        //Get the two sub arrays
        let left = leftStart,
          right = Math.min(left + size, n),
          leftLimit = right,
          rightLimit = Math.min(right + size, n);

        //Merge the sub arrays

        merge(left, right, leftLimit, rightLimit, sorted, buffer);
      }

      //Swap the sorted sub array and merge them
      setTimeout(() => {
        let temp = sorted;
        sorted = buffer;
        buffer = temp;
        setTimeout(() => {
          setPrimaryArray(sorted);
        }, size * 10);
      }, 500);
    }

    return sorted;
  };

  const merge = (
    left: number,
    right: number,
    leftLimit: number,
    rightLimit: number,
    sorted: number[],
    buffer: number[]
  ) => {
    let i = left;

    //Compare the two sub arrays and merge them in the sorted order
    while (left < leftLimit && right < rightLimit) {
      if (sorted[left] <= sorted[right]) {
        buffer[i++] = sorted[left++];
      } else {
        buffer[i++] = sorted[right++];
      }
    }

    //If there are elements in the left sub arrray then add it to the result
    while (left < leftLimit) {
      buffer[i++] = sorted[left++];
    }

    //If there are elements in the right sub array then add it to the result
    while (right < rightLimit) {
      buffer[i++] = sorted[right++];
    }
    return sorted;
  };

  // selectionSort
  const selectionSort = (arr: number[]) => {
    setTimeout(() => {
      let newArr = [...arr];
      for (let i = 0; i < arr.length - 1; i++) {
        setTimeout(() => {
          for (let j = i + 1; j < arr.length; j++) {
            if (newArr[i] > newArr[j]) {
              setTimeout(() => {
                setCurrentValue(newArr[i]);
                setTestValue(newArr[j]);
              }, j * 100);

              let temp = newArr[i];
              newArr[i] = newArr[j];
              newArr[j] = temp;
              let newStep = [...newArr];
              setTimeout(() => {
                setPrimaryArray([...newStep]);
              }, j * 100);
            }
          }
        }, i * 1000);
      }
    }, 500);
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

  //bubbleSort
  const bubbleSort = (arr: number[]) => {
    let newArr = [...arr];
    setTimeout(() => {
      //loop through whole array
      for (let i = 0; i < newArr.length; i++) {
        setTimeout(() => {
          //loop through array again testing currentValue against next value in array
          for (let j = 0; j < newArr.length; j++) {
            //if the next value is bigger set the current value to the bigger value
            if (newArr[j] > newArr[j + 1]) {
              //swap values as we go through the array
              let tmp = newArr[j];
              setTimeout(() => {
                setTestValue(tmp);
              }, j * 75);
              newArr[j] = newArr[j + 1];
              newArr[j + 1] = tmp;
              let setArr = [...newArr];
              setTimeout(() => {
                setPrimaryArray([...setArr]);
              }, j * 75);
            }
          }
        }, i * 1500);
      }
    }, 500);
    return;
  };

  useEffect(() => {
    let shuffled = primaryArray && shuffleArray(primaryArray);
    setCurrentValue(0);
    setTestValue(0);
    setPrimaryArray(shuffled);
  }, [reset]);

  useEffect(() => {
    setPrimaryArray(shuffleArray(data));
  }, []);

  return (
    <div className="flex flex-row items-end w-full">
      {primaryArray?.map((element: number) => (
        <div
          key={element}
          className={
            element === currentValue
              ? `w-10 m-1 text-center h-[${element * 10}px] bg-red-300 `
              : element === testValue
              ? `w-10 m-1 text-center h-[${element * 10}px] bg-green-300 `
              : `w-10 m-1 text-center h-[${element * 10}px] bg-slate-300 `
          }
        >
          {element}
        </div>
      ))}
      <button
        onClick={() => selectionSort(primaryArray)}
        className="inline-block  rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
      >
        <span className="block px-8 py-3 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          Selection sort
        </span>
      </button>
      <button
        onClick={() => bubbleSort(primaryArray)}
        className="inline-block  rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
      >
        <span className="block px-8 py-3 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          Bubble sort
        </span>
      </button>
      <button
        onClick={() => mergeSort(primaryArray)}
        className="inline-block  rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
      >
        <span className="block px-8 py-3 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          Merge sort
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
    </div>
  );
};

export default Test;
