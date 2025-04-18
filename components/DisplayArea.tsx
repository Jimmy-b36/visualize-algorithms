import { SortState } from '../helpers/sortingAlgorithms';

interface DisplayAreaProps {
  state: SortState;
  arraySize: number;
  arraySizeOptions: { [key: number]: string };
}

const DisplayArea = ({
  state,
  arraySize,
  arraySizeOptions,
}: DisplayAreaProps) => {
  return (
    <div className="flex flex-row items-end justify-center p-2 mt-1 mb-1 border-2 border-black rounded-lg shadow-lg bg-white w-full max-w-[1200px] mx-auto min-h-[540px]">
      {state.array?.map((element: number, index: number) => {
        let barColor = 'bg-blue-500'; // Default color
        if (state.comparing?.includes(index)) {
          barColor = 'bg-yellow-500'; // Color for comparing bars
          if (state.swapped) {
            barColor = 'bg-green-500'; // Color for swapped bars
          }
        }

        const barWidth = arraySizeOptions[arraySize] ?? '5px';

        return (
          <div
            key={index}
            className={`text-center text-black border border-black ${barColor}`}
            style={{
              height: `${element}px`,
              width: barWidth,
              margin: `0 ${
                arraySize > 40 ? '1px' : arraySize > 20 ? '2px' : '3px'
              }`,
            }}
          >
            {arraySize < 40 ? element : null}
          </div>
        );
      })}
      {(!state.array || state.array.length === 0) && (
        <div className="text-gray-500">Generate an array to visualize.</div>
      )}
    </div>
  );
};

export default DisplayArea;
