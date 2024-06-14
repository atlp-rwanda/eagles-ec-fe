import React from "react";

interface ButtonProps {
  text: string;
  disabled?: boolean;
  dataTestId?: string;
}

const Button: React.FC<ButtonProps> = ({ text, disabled, dataTestId }) => (
  <button
    type="submit"
    className="bg-[#161616] text-white py-3 my-4 text-normal md:text-lg rounded-sm"
    disabled={disabled}
    data-testid={dataTestId}
  >
    {text}
  </button>
);
export default Button;
