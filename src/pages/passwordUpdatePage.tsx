import { useState } from "react";

import UpdatePasswordmod from "../components/password/updateModal";

const UpdatePasswordPage = () => {
  const [PasswordModal, setPasswordModal] = useState(true);
  const target = window.location.search.split("=")[1];
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <button
        onClick={() => {
          setPasswordModal(true);
        }}
        className="bg-[#DB4444] text-white py-3 px-2 my-4 text-normal md:text-lg rounded-sm"
        type="button"
      >
        Update Password
      </button>

      {PasswordModal && (
        <UpdatePasswordmod
          setPasswordModal={setPasswordModal}
          target={target}
        />
      )}
    </div>
  );
};

export default UpdatePasswordPage;
