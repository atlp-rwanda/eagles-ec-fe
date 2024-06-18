import React from "react";
import { UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  name: string;
  type: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error: string | undefined;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  type,
  placeholder,
  register,
  error,
  className,
}) => (
  <div className="py-4">
    <input
      className={`w-full border-b bg-transparent font-normal text-normal py-1 border-transparent border-b-gray-500 outline-none ${className}`}
      type={type}
      placeholder={placeholder}
      {...register(name)}
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default InputField;
