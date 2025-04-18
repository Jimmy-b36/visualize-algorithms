import type { NextPage } from 'next';
import { useEffect, useMemo, useRef, useState } from 'react';
import ControlPanel from '../components/ControlPanel';
import DisplayArea from '../components/DisplayArea';
import {
  bubbleSort,
  insertionSort,
  mergeSort,
  selectionSort,
  SortState,
} from '../helpers/sortingAlgorithms';
import { sortingProps } from '../types';

export interface SortButtonProps {
  onClick: (algorithmName: string) => void;
  isGenerating: boolean;
  algorithmName: string;
}

function shuffleArray(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Home: NextPage = () => {
  const [primaryArray, setPrimaryArray] = useState<number[]>([]);
  const [isGeneratingHistory, setIsGeneratingHistory] =
    useState<boolean>(false);
  const [arraySize, setArraySize] = useState<number>(10);
  const [currentSelection, setCurrentSelection] = useState<string>('');
  const [history, setHistory] = useState<SortState[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const arraySizeOptions: { [key: number]: string } = {
    10: '400px',
    20: '200px',
    40: '100px',
    60: '60px',
    80: '40px',
  };

  const generateArray = (size: number = arraySize) => {
    const newArray: number[] = Array.from(
      { length: Math.floor(Math.random() + size) },
      () => Math.floor(Math.random() * 500 + 1)
    );
    return newArray;
  };

  const generateSortHistory = (algorithmName: string) => {
    if (isGeneratingHistory) return;

    setIsGeneratingHistory(true);
    setCurrentSelection(algorithmName);
    setHistory([]);
    setHistoryIndex(-1);
    pausePlaying();

    const newShuffledArray = shuffleArray(generateArray(arraySize));
    setPrimaryArray(newShuffledArray);

    let generator: Generator<SortState, void, unknown>;
    switch (algorithmName) {
      case 'Bubble Sort':
        generator = bubbleSort(newShuffledArray);
        break;
      case 'Merge Sort':
        generator = mergeSort(newShuffledArray);
        break;
      case 'Selection Sort':
        generator = selectionSort(newShuffledArray);
        break;
      case 'Insertion Sort':
        generator = insertionSort(newShuffledArray);
        break;
      default:
        console.error('Unknown algorithm:', algorithmName);
        setIsGeneratingHistory(false);
        return;
    }

    const collectedStates: SortState[] = [];
    try {
      collectedStates.push(...Array.from(generator));
    } catch (error) {
      console.error(`Error during ${algorithmName} generation:`, error);
    } finally {
      setHistory(collectedStates);
      setHistoryIndex(0);
      setIsGeneratingHistory(false);
    }
  };

  const goToNextStep = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    } else {
      pausePlaying();
    }
  };

  const goToPreviousStep = () => {
    setHistoryIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const currentDisplayState = useMemo(() => {
    if (historyIndex < 0 || historyIndex >= history.length) {
      return {
        array: primaryArray,
        comparing: null,
        swapped: false,
      };
    }
    const state = history[historyIndex];
    return state;
  }, [history, historyIndex, primaryArray]);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(400);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startPlaying = () => {
    setIsPlaying(true);
  };

  const pausePlaying = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const generatedArray = generateArray();
    setPrimaryArray(generatedArray);
    setHistory([]);
    setHistoryIndex(-1);
    pausePlaying();
  }, [arraySize]);

  useEffect(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlaying && historyIndex < history.length - 1) {
      intervalRef.current = setTimeout(() => {
        goToNextStep();
      }, playbackSpeed);
    } else if (isPlaying && historyIndex >= history.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPlaying, historyIndex, history.length, playbackSpeed, goToNextStep]);

  const resetArray = () => {
    const newGeneratedArray = generateArray(arraySize);
    const shuffledArray = shuffleArray(newGeneratedArray);
    setPrimaryArray(shuffledArray);
    pausePlaying();
    setCurrentSelection('');
    setHistory([]);
    setHistoryIndex(-1);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-5 bg-gray-50">
      <h1 className="m-1 text-2xl font-bold underline">Algorithm Visualizer</h1>
      <div className="m-1 text-xl">
        {isGeneratingHistory
          ? 'Generating History...'
          : currentSelection
          ? `Algorithm: ${currentSelection}`
          : 'Select an Algorithm'}
      </div>
      <DisplayArea
        state={currentDisplayState}
        arraySize={arraySize}
        arraySizeOptions={arraySizeOptions}
      />
      <ControlPanel
        arraySize={arraySize}
        setArraySize={setArraySize}
        isGeneratingHistory={isGeneratingHistory}
        isPlaying={isPlaying}
        historyLength={history.length}
        historyIndex={historyIndex}
        generateSortHistory={generateSortHistory}
        startPlaying={startPlaying}
        pausePlaying={pausePlaying}
        resetArray={resetArray}
        goToPreviousStep={goToPreviousStep}
        goToNextStep={goToNextStep}
        playbackSpeed={playbackSpeed}
        setPlaybackSpeed={setPlaybackSpeed}
      />
      <footer className="w-full mt-8 mb-2 flex flex-col items-center">
        <div className="text-gray-600 text-sm">
          Made with <span className="text-red-500">❤️</span> by James Ball{' '}
          <a
            href="https://github.com/Jimmy-b36/visualize-algorithms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-600 ml-1"
          >
            [git repo]
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
