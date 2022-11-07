export interface sortingProps {
  primaryArray: number[];
  setPrimaryArray: Dispatch<SetStateAction<number[]>>;
  setIsSorting: Dispatch<SetStateAction<boolean>>;
  setCurrentIndex: Dispatch<SetStateAction<number[]>>;
  setTestIndex: Dispatch<SetStateAction<number[]>>;
  isSorting: boolean;
  speed: { [key: number]: number[] };
  pauseRef: MutableRefObject<boolean>;
  setCurrentSelection: Dispatch<SetStateAction<string>>;
  pause: () => Promise<void>;
  stop: MutableRefObject<boolean>;
}
