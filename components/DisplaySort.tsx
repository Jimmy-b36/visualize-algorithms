import { SortButtonProps } from '../pages/index';

const DisplaySort = ({
  onClick,
  isGenerating,
  algorithmName,
}: SortButtonProps) => {
  return (
    <div>
      <button
        onClick={() => onClick(algorithmName)}
        className={`inline-block rounded-full bg-gradient-to-r h-full from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 `}
        disabled={isGenerating}
      >
        <span className="block px-8 py-5 text-sm font-medium bg-white rounded-full hover:bg-transparent">
          {algorithmName}
        </span>
      </button>
    </div>
  );
};

export default DisplaySort;
