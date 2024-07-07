import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only"
      checked={checked}
      onChange={onChange}
    />
    <div
      className={`block w-14 h-8 rounded-full ${checked ? "bg-[#DB4444]" : "bg-[#D4D4D4]"}`}
    />
    <div
      className={`dot absolute left-1 top-1 flex justify-center bg-white w-6 h-6 rounded-full transition ${
        checked ? "transform translate-x-6" : ""
      }`}
    >
      {checked ? (
        <svg
          className="w-4 h-4 mx-auto my-auto text-brand-blue"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4 mx-auto my-auto text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 12h12"
          />
        </svg>
      )}
    </div>
  </label>
);

export default ToggleSwitch;
