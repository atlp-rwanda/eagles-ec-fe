import React from "react";

interface ButtonProps {
  text: string;
  variant: "filled" | "outlined";
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  variant,
  onClick,
  type,
  disabled,
}) => {
  const baseStyle = `py-3 px-6 w-full rounded-[8px] text-center font-bold transition duration-200 ease-in-out focus:outline-none`;

  const filledStyle = `bg-primary text-white`;
  const outlinedStyle = `bg-transparent text-primary border-2 border-primary`;

  return (
    <button
      data-testid="button"
      className={`${baseStyle} ${variant === "filled" ? filledStyle : outlinedStyle}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
