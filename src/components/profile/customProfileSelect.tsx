/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type TextInputProps = {
  label: string;
  defaultValue?: string | number;
  register: any;
  name: string;
  error?: any;
  type?: "text" | "select"; // Define types here
  options?: { value: string | number; label: string }[]; // Options for select dropdown
};

const ProfileTextInptCustomSelect: React.FC<TextInputProps> = ({
  label,
  defaultValue,
  register,
  name,
  error,
  type = "text",
  options, // Options prop for select dropdown
}) => (
  <div>
    <label
      className="text-md sm:text-lg block mb-1 sm:mb-2 text-dark-gray"
      htmlFor={name}
    >
      {label}
    </label>
    {type === "text" ? ( // Render text input
      <input
        defaultValue={defaultValue}
        type="text"
        id={name}
        className="w-full bg-gray-100 text-[#161616] border-[0.5px] border-[#E5E5E5] py-1 sm:py-2 text-md font-light rounded-[8px] px-4 focus:outline-none"
        {...register(name)}
      />
    ) : type === "select" && options ? (
      <select
        defaultValue={defaultValue}
        id={name}
        className="w-full bg-gray-100 text-[#161616] border-[0.5px] border-[#E5E5E5] py-1 sm:py-2 text-md font-light rounded-[8px] px-4 focus:outline-none"
        {...register(name)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : null}
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default ProfileTextInptCustomSelect;
