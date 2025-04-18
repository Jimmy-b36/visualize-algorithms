import {
  MdLoop,
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from 'react-icons/md';
import { SortButtonProps } from '../pages/index'; // Assuming index exports this
import DisplaySort from './DisplaySort';

interface ControlPanelProps {
  arraySize: number;
  setArraySize: (size: number) => void;
  isGeneratingHistory: boolean;
  isPlaying: boolean;
  historyLength: number;
  historyIndex: number;
  generateSortHistory: (algorithmName: string) => void;
  startPlaying: () => void;
  pausePlaying: () => void;
  resetArray: () => void;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
}

const ControlPanel = ({
  arraySize,
  setArraySize,
  isGeneratingHistory,
  isPlaying,
  historyLength,
  historyIndex,
  generateSortHistory,
  startPlaying,
  pausePlaying,
  resetArray,
  goToPreviousStep,
  goToNextStep,
}: ControlPanelProps) => {
  const arraySizeValues = [10, 20, 40, 60, 80];
  const sortButtonCommonProps: Omit<SortButtonProps, 'algorithmName'> = {
    onClick: generateSortHistory,
    isGenerating: isGeneratingHistory,
  };

  const sortingAlgorithms = [
    'Bubble Sort',
    'Merge Sort',
    'Selection Sort',
    'Insertion Sort',
  ];

  return (
    <div className="flex flex-col items-center w-full gap-4 p-4 border-t-2 border-gray-200 mt-4">
      <div className="flex flex-wrap items-start justify-center w-full gap-6">
        <div className="flex flex-col items-center justify-center">
          <p>Array size & speed</p>
          <fieldset className="flex flex-wrap gap-3">
            <legend className="sr-only">Array size</legend>
            {arraySizeValues.map(size => (
              <div key={size}>
                <input
                  type="radio"
                  name="arraySizeOption"
                  value={size}
                  id={`size${size}`}
                  className="hidden peer"
                  onChange={() => setArraySize(size)}
                  disabled={isGeneratingHistory || isPlaying} // Also disable if playing
                  checked={arraySize === size}
                />
                <label
                  htmlFor={`size${size}`}
                  className={`flex items-center justify-center px-3 py-2 text-gray-900 border border-gray-100 rounded-md cursor-pointer hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white ${
                    size > 20 && size < 80
                      ? 'hidden lg:flex xl:flex'
                      : size === 80
                      ? 'hidden lg:flex xl:flex'
                      : 'flex'
                  }`}
                >
                  <p className="text-sm font-medium">{size}</p>
                </label>
              </div>
            ))}
          </fieldset>
        </div>

        <div className="grid grid-cols-2 gap-4 pl-2 ml-2 lg:grid-cols-4 xl:grid-cols-4">
          {sortingAlgorithms.map(algorithmName => (
            <DisplaySort
              {...sortButtonCommonProps}
              algorithmName={algorithmName}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center w-full gap-4">
        <button
          onClick={resetArray}
          className="inline-block rounded-full bg-gradient-to-r  mx-1 from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
          disabled={isGeneratingHistory}
        >
          <span className="block h-full px-8 py-3 text-2xl font-medium bg-white rounded-full hover:bg-transparent">
            <MdLoop />
          </span>
        </button>

        <button
          onClick={isPlaying ? pausePlaying : startPlaying}
          disabled={
            isGeneratingHistory ||
            historyLength === 0 ||
            historyIndex >= historyLength - 1
          }
          className="inline-block rounded-full bg-gradient-to-r mx-1 from-green-400 via-blue-500 to-purple-600 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 disabled:opacity-70 disabled:cursor-not-allowed"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <span className="block h-full px-8 py-3 text-2xl font-medium bg-white rounded-full hover:bg-transparent">
            {isPlaying ? <MdPause /> : <MdPlayArrow />}
          </span>
        </button>

        <button
          onClick={goToPreviousStep}
          disabled={isPlaying || isGeneratingHistory || historyIndex <= 0}
          className="p-2 rounded-full bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
          aria-label="Previous Step"
        >
          <MdSkipPrevious size={24} />
        </button>
        <span>
          Step: {historyIndex >= 0 ? historyIndex + 1 : '-'} /{' '}
          {historyLength > 0 ? historyLength : '-'}
        </span>
        <button
          onClick={goToNextStep}
          disabled={
            isPlaying ||
            isGeneratingHistory ||
            historyIndex === -1 ||
            historyIndex >= historyLength - 1
          }
          className="p-2 rounded-full bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
          aria-label="Next Step"
        >
          <MdSkipNext size={24} />
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
