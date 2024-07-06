import React from "react";

interface ProfileDataProps {
  label: string;
  value: string | number | null;
}

const DisplayProfileData: React.FC<ProfileDataProps> = ({ label, value }) => (
  <center>
    <div className="block sm:flex justify-between border-solid border-b-[1px] border-gray-200 pt-[1%]">
      <p className="flex w-[100%] text-md sm:text-lg">{label}</p>
      <p className="flex justify-start w-[100%] text-sm sm:text-lg font-light text-gray-500">
        {value}
      </p>
    </div>
  </center>
);

export default DisplayProfileData;
