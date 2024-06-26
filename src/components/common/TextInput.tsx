/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type TextInputProps = {
  label: string;
  placeholder?: string;
  register: any;
  name: string;
  error?: any;
  type?: string;
  readOnly?: boolean;
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  register,
  name,
  error,
  type = "text",
  readOnly = false,
}) => (
  <div>
    <label className="text-lg block mb-2 text-dark-gray" htmlFor={name}>
      {label}
    </label>
    <input
      type={type}
      id={name}
      className="w-full bg-white text-[#161616] border-[0.5px] border-[#E5E5E5] py-2 text-lg rounded-[8px] px-4 focus:outline-none"
      placeholder={placeholder}
      {...register(name)}
      readOnly={readOnly}
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default TextInput;
