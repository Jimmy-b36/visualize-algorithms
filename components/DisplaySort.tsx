import React from 'react';
import { SortButtonProps } from '../pages/index';

const DisplaySort: React.FC<SortButtonProps> = ({
  onClick,
  isGenerating,
  algorithmName,
}) => {
  return (
    <button
      onClick={() => onClick(algorithmName)}
      disabled={isGenerating}
      className="rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-4 py-2 text-base font-semibold text-white transition-all shadow-sm disabled:bg-gray-300 disabled:text-gray-400 m-1 min-w-[120px]"
      style={{ minHeight: '48px' }}
    >
      {algorithmName}
    </button>
  );
};

export default DisplaySort;
