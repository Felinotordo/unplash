import React from "react";

interface AddCollectionCardProps {
  onClick: () => void;
}

export const AddCollectionCard: React.FC<AddCollectionCardProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="
        sm:w-[350px] sm:h-[280px] h-[260px]
        flex flex-col items-center justify-center
        bg-light-transparent dark:bg-light/50
        rounded-lg
        hover:border-gray-400 hover:bg-gray-50
        transition-all
        cursor-pointer
      "
    >
      <div className="text-5xl text-gray dark:text-dark mb-2">+</div>
      <span className="text-gray dark:text-dark font-vietnam font-semibold text-[18px]">
        Add new collection
      </span>
    </button>
  );
};
