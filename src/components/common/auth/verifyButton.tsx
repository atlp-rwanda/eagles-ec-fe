import React from "react";

interface VerifayButtonProps {
  text: string;
  textColor: string;
  disabled?: boolean;
  dataTestId?: string;
}

const VerifyButton: React.FC<VerifayButtonProps> = ({
  text,
  textColor,
  disabled,
  dataTestId,
}) => (
  <button
    type="submit"
    className="bg-[#161616] text-white text-center py-1 my-4 text-[100%] md:text-[100%] w-[50%] h-[2.5rem] rounded-[30px]"
    disabled={disabled}
    data-testid={dataTestId}
  >
    {text}
    <span className="text-[#DB4444]">{textColor}</span>
  </button>
);

export default VerifyButton;
