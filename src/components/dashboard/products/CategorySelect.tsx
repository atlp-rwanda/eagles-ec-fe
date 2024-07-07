import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface CategorySelectProps {
  options: string[];
  defaultValue: string;
  onSelect: (option: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  options,
  defaultValue,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative min-w-40">
      <div
        className="appearance-none bg-transparent border-[0.5px] flex items-center justify-between text-md gap-2 border-gray-400 text-dark-gray  px-4 py-2 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption}
        {' '}
        <FaAngleDown />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 z-10 bg-white w-full text-dark-gray rounded-lg border-[0.5px] border-gray-400 mt-1">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 text-dark-gray whitespace-nowrap text-md hover:bg-slate-50 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
