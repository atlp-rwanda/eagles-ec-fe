import React from "react";

interface ButtonProps {
  text: string;
  disabled?: boolean;
  dataTestId?: string;
  backgroundColor?: string;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  disabled,
  dataTestId,
  backgroundColor,
  className,
  onClick,
}) => (
  <button
    type="submit"
    className={`${backgroundColor} text-white py-3  px-12 my-4 text-normal md:text-lg rounded-sm cursor-pointer ${className}`}
    disabled={disabled}
    data-testid={dataTestId}
    onClick={onClick}
  >
    {text}
  </button>
);
export default Button;
