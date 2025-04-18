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

  const speed: sortingProps['speed'] = {
    10: [800, 400],
    20: [400, 200],
    40: [200, 100],
    60: [150, 40],
    80: [150, 10],
  };

  const arraySizeOptions: { [key: number]: string } = {
    10: '40px',
    20: '20px',
    40: '10px',
    60: '6px',
    80: '4px',
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

    let generator: Generator<SortState, void, unknown>;
    switch (algorithmName) {
      case 'Bubble Sort':
        generator = bubbleSort(primaryArray);
        break;
      case 'Merge Sort':
        generator = mergeSort(primaryArray);
        break;
      case 'Selection Sort':
        generator = selectionSort(primaryArray);
        break;
      case 'Insertion Sort':
        generator = insertionSort(primaryArray);
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
    return history[historyIndex];
  }, [history, historyIndex, primaryArray]);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const autoPlayDelay = useMemo(() => {
    return speed[arraySize]?.[1] ?? 100;
  }, [arraySize, speed]);

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
      }, autoPlayDelay);
    } else if (isPlaying && historyIndex >= history.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPlaying, historyIndex, history.length, autoPlayDelay, goToNextStep]);

  const resetArray = () => {
    const newGeneratedArray = generateArray(arraySize);
    setPrimaryArray(newGeneratedArray);
    pausePlaying();
    setCurrentSelection('');
    setHistory([]);
    setHistoryIndex(-1);
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen pt-5">
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
      />
    </div>
  );
};

export default Home;
