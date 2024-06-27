import React, { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputProps {
  id: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  placeholder,
  register,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4 relative">
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        className={`w-full p-2 border-b ${error ? "border-red-500" : "border-gray-300"} pr-20`}
        placeholder={placeholder}
        {...register}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default PasswordInput;
