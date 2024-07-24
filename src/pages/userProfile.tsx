import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { getProfile } from "../redux/reducers/profileSlice";
import { RootState } from "../redux/store";
import DisplayProfileData from "../components/profile/getProfile";
import Spinner from "../components/profile/spinner";
import LinkToUpdatePage from "../components/profile/linkToUpdate";
import HeaderInfo from "../components/common/header/Info";
import Footer from "../components/common/footer/Footer";

const UsersProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading, error } = useSelector(
    (state: RootState) => state.usersProfile,
  );
  useEffect(() => {
    // @ts-ignore
    dispatch(getProfile());
  }, [dispatch]);
  const loggedInUserToken = localStorage.getItem("accessToken");
  if (!loggedInUserToken) {
    navigate("/login");
  }
  if (loading) {
    return (
      <div>
        <Spinner />
        <div className="flex justify-center items-center text-[100%] pt-[1%]">
          Loading...
        </div>
      </div>
    );
  }
  if (error) {
    <div>
      <div className="sticky top-0 w-[92%] ml-[4%] mr-[4%]">
        <HeaderInfo />
      </div>
      <LinkToUpdatePage link="/">
        <p className="border-solid sm:border-none border-b-[1px] border-gray-200 ">
          <span className="text-gray-400 hover:text-[#DB4444]">Home</span>
          /Profile
          {" "}
        </p>
      </LinkToUpdatePage>
      <p>error;</p>
    </div>;
  }
  return (
    <div className="parent-container h-screen overflow-auto">
      <div className="sticky top-0 w-[92%] ml-[4%] mr-[4%]">
        <HeaderInfo />
      </div>
      <div className="bg-gray-200 w-100% sm:w-[100%] h-[1px] mt-[0.1%]" />
      <div className="w-[92%] overflow-y-hidden ml-[4%] mr-[4%]">
        <LinkToUpdatePage link="/">
          <p className="border-solid sm:border-none border-b-[1px] border-gray-200 ">
            <span className="text-gray-400 hover:text-[#DB4444]">Home</span>
            /Profile
            {" "}
          </p>
        </LinkToUpdatePage>
        <div className="flex flex-row items-center mt-[1%] w-full sm:w-auto">
          <div className="flex items-center space-x-2 w-[100%] flex-wrap">
            <div className="h-[70px] w-[70px] sm:h-[100px] sm:w-[100px] rounded-md">
              {profile?.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="profile"
                  className="w-full h-full object-cover rounded-[50%] "
                />
              ) : (
                <div className="flex items-center justify-center h-full rounded-[50%]">
                  <FaCircleUser size={70} color="gray" />
                </div>
              )}
            </div>
            <div className="hidden sm:block">
              <p className="w-[100%] font-bold">{profile?.fullName}</p>
              <p className="w-[100%] text-gray-500">{profile?.email}</p>
            </div>
          </div>
          <div className="w-[100%] flex justify-end mr-[4%]">
            <LinkToUpdatePage link="/profile/update">
              <button
                className="bg-[#DB4444] text-white text-center rounded-md p-1 sm:p-3 text-md sm:text-lg"
                type="button"
              >
                <FontAwesomeIcon icon={faPenToSquare} className="px-2" />
                Edit profile
              </button>
            </LinkToUpdatePage>
          </div>
        </div>
        <div className="bg-gray-200 w-100% sm:w-[100%] h-[1px] mt-[1%]" />
        {profile && (
          <div className="text-black">
            <DisplayProfileData label="Full name" value={profile.fullName} />
            <DisplayProfileData label="Email" value={profile.email} />
            <DisplayProfileData label="Gender" value={profile.gender} />
            <DisplayProfileData label="Birth Date" value={profile.birthdate} />
            <DisplayProfileData
              label="Preferred language"
              value={profile.preferredLanguage}
            />
            <DisplayProfileData
              label="Preferred currency"
              value={profile.preferredCurrency}
            />
            <DisplayProfileData label="Street" value={profile.street} />
            <DisplayProfileData label="City" value={profile.city} />
            <DisplayProfileData
              label="Postal code"
              value={profile.postalCode}
            />
            <DisplayProfileData label="State" value={profile.state} />
            <DisplayProfileData label="Country" value={profile.country} />
          </div>
        )}
      </div>
      <div className=" mt-[2%]">
        <Footer />
      </div>
    </div>
  );
};

export default UsersProfile;
