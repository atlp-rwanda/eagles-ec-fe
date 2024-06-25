import React from "react";

interface ButtonProps {
  text: string;
  disabled?: boolean;
  dataTestId?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  disabled,
  dataTestId,
  backgroundColor,
}) => (
  <button
    type="submit"
    className={`${backgroundColor} text-white p-1 sm:py-3 px-3 sm:px-12 my-4 text-normal md:text-lg rounded-sm cursor-pointer`}
    disabled={disabled}
    data-testid={dataTestId}
  >
    {text}
  </button>
);
export default Button;
