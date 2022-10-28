import { Dispatch, SetStateAction } from 'react';

const BubbleSort = (props: {
  primaryArray: number[];
  setPrimaryArray: Dispatch<SetStateAction<number[]>>;
}) => {
  //bubbleSort
  const bubbleSort = async (arr: number[]) => {
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
              setTimeout(() => {}, j * 75);
              newArr[j] = newArr[j + 1];
              newArr[j + 1] = tmp;
              let setArr = [...newArr];
              setTimeout(() => {
                props.setPrimaryArray(setArr);
              }, j * 75);
            }
          }
        }, i * 1500);
      }
    }, 500);
    return;
  };

  return (
    <div>
      <button
        onClick={() => bubbleSort(props.primaryArray)}
        className="inline-block  rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
      >
        <span className="block px-8 py-3 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          Bubble sort
        </span>
      </button>
    </div>
  );
};

export default BubbleSort;
