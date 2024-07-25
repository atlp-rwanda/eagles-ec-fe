import React from "react";
import { useNavigate } from "react-router-dom";

interface SearchSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  onSelect,
}) => {
  const navigate = useNavigate();

  const searchDiscovery = [
    { label: "macbook" },
    { label: "Laptop" },
    { label: "Laptop Stand" },
    { label: "T-shirt", icon: "🔥" },
    { label: "iphone" },
    { label: "Pants", icon: "🔥" },
  ];

  const handleSelect = (suggestion: string) => {
    navigate(`/products?query=${encodeURIComponent(suggestion)}`);
    onSelect(suggestion);
  };

  return (
    <div className="absolute w-full bg-white z-50 border border-gray-200 shadow-lg max-h-48 overflow-y-auto transition-transform transform translate-y-0 opacity-100 px-4 py-4">
      <div>
        <label className="font-semibold mb-2 block">Search Discovery</label>
        <ul className="flex flex-wrap gap-2">
          {searchDiscovery.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 text-sm bg-gray-100 rounded-md cursor-pointer flex items-center"
              onClick={() => handleSelect(item.label)}
            >
              {item.label}
              {" "}
              {item.icon && <span className="ml-1">{item.icon}</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchSuggestions;
