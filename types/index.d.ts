export interface sortingProps {
  primaryArray: number[];
  setPrimaryArray: Dispatch<SetStateAction<number[]>>;
  setIsSorting: Dispatch<SetStateAction<boolean>>;
  setCurrentIndex: Dispatch<SetStateAction<number[]>>;
  setTestIndex: Dispatch<SetStateAction<number[]>>;
  isSorting: boolean;
}
