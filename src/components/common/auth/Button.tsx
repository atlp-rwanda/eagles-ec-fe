import React from "react";

interface ButtonProps {
  text: string;
  disabled?: boolean;
  dataTestId?: string;
  backgroundColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  disabled,
  dataTestId,
  backgroundColor,
}) => (
  <button
    type="submit"
    className={`${backgroundColor} text-white py-3  px-12 my-4 text-normal md:text-lg rounded-sm cursor-pointer`}
    disabled={disabled}
    data-testid={dataTestId}
  >
    {text}
  </button>
);
export default Button;
