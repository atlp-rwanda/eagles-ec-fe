import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";

interface CustomSelectProps {
  options: any[];
  defaultValue: string;
  onSelect: (option: string) => void;
  testId?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultValue,
  onSelect,
  testId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const loading = useSelector((state: RootState) => state.categories.loading);

  const handleOptionClick = (option: any) => {
    setIsOpen(false);
    if (option !== "Category") {
      onSelect(option);
    }
  };

  return (
    <div className="relative min-w-40">
      <div
        className="appearance-none rounded-[8px] border-[0.5px] border-[#E5E5E5] px-4 py-3 bg-white  flex items-center justify-between text-md gap-2 text-black  cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        data-testid={testId}
      >
        {defaultValue}
        {' '}
        <FaAngleDown />
      </div>
      {isOpen && (
        <div className="absolute category-options top-full max-h-64 overflow-y-scroll w-full left-0 z-10 shadow rounded-[8px] py-3 bg-white text-[#161616] border-gray-800 mt-1">
          {loading ? (
            <div className="flex items-center justify-center select-none py-6">
              loading categories...
            </div>
          ) : options.length === 0 ? (
            <div className="flex items-center justify-center select-none py-6">
              No categories found.
            </div>
          ) : (
            options.map((option) => (
              <div
                key={option.id}
                className="px-4 py-2 text-gray-700 text-md hover:bg-[#F7F8FA] cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
