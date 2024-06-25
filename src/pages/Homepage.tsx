import { useState } from "react";

import UpdatePasswordmod from "../components/password/updateModal";

const Homepage = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  return (
    <>
      <div>Homepage</div>
      <button
        onClick={() => {
          setShowPasswordModal(true);
        }}
        className="bg-[#DB4444] text-white py-3 px-2 my-4 text-normal md:text-lg rounded-sm"
        type="button"
      >
        Update Password
      </button>
      {showPasswordModal && (
        <UpdatePasswordmod setPasswordModal={setShowPasswordModal} />
      )}
    </>
  );
};

export default Homepage;
