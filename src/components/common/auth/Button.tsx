import React from "react";

interface ButtonProps {
  text: string;
  disabled?: boolean;
  dataTestId?: string;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  disabled,
  dataTestId,
  className,
  onClick,
}) => (
  <button
    type="submit"
    className={`bg-[#161616] text-white py-3 my-4 text-normal md:text-lg rounded-sm ${className}`}
    disabled={disabled}
    data-testid={dataTestId}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
