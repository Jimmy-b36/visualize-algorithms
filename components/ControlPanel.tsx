import {
  MdLoop,
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from 'react-icons/md';
import { SortButtonProps } from '../pages/index';
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
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
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
  playbackSpeed,
  setPlaybackSpeed,
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
          <p>Array size</p>
          <fieldset className="flex flex-wrap gap-3 mb-2">
            {arraySizeValues.map(size => (
              <div key={size}>
                <input
                  type="radio"
                  id={`size${size}`}
                  name="arraySize"
                  value={size}
                  checked={arraySize === size}
                  onChange={() => setArraySize(size)}
                  className="peer hidden"
                  disabled={isGeneratingHistory || isPlaying}
                />
                <label
                  htmlFor={`size${size}`}
                  className={`flex items-center justify-center px-3 py-2 text-gray-900 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white font-semibold transition-all duration-150 ${
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
          <div className="flex flex-col items-center mx-4 mt-2">
            <label htmlFor="speed" className="mb-1 font-medium">
              Speed
            </label>
            <input
              id="speed"
              type="range"
              min={10}
              max={1500}
              step={10}
              value={playbackSpeed}
              onChange={e => setPlaybackSpeed(Number(e.target.value))}
              className="w-32 accent-blue-500"
              disabled={isGeneratingHistory}
            />
            <span className="text-xs mt-1">{playbackSpeed} ms/step</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pl-2 ml-2 lg:grid-cols-4 xl:grid-cols-4">
          {sortingAlgorithms.map(algorithmName => (
            <DisplaySort
              key={algorithmName}
              {...sortButtonCommonProps}
              algorithmName={algorithmName}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center w-full gap-4 mt-2">
        <button
          onClick={resetArray}
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-2xl font-bold text-gray-700 transition-all border border-gray-300 shadow-sm disabled:bg-gray-200 disabled:text-gray-400"
          disabled={isGeneratingHistory}
        >
          <MdLoop />
        </button>
        <button
          onClick={isPlaying ? pausePlaying : startPlaying}
          disabled={
            isGeneratingHistory ||
            historyLength === 0 ||
            historyIndex >= historyLength - 1
          }
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-2xl font-bold text-white transition-all shadow-sm disabled:bg-gray-300 disabled:text-gray-400"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <MdPause /> : <MdPlayArrow />}
        </button>
        <button
          onClick={goToPreviousStep}
          disabled={isPlaying || isGeneratingHistory || historyIndex <= 0}
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-2xl text-gray-700 border border-gray-300 shadow-sm disabled:bg-gray-200 disabled:text-gray-400"
          aria-label="Previous Step"
        >
          <MdSkipPrevious size={24} />
        </button>
        <span className="font-mono text-base px-2">
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
          className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-2xl text-gray-700 border border-gray-300 shadow-sm disabled:bg-gray-200 disabled:text-gray-400"
          aria-label="Next Step"
        >
          <MdSkipNext size={24} />
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
