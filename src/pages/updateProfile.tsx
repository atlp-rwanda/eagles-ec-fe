import React, { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError } from "axios";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import LinkPages from "../components/common/auth/LinkPages";
import { RootState } from "../redux/store";
import profileSchema from "../schemas/profileSchema";
import ProfileTextInput from "../components/profile/updateProfileInput";
import { getProfile } from "../redux/reducers/profileSlice";
import { updateProfile } from "../redux/reducers/updateProfileSlice";
import { useAppDispatch } from "../redux/hooks";
import sideImage from "../assets/sideImage.png";
import Button from "../components/profile/updateProfileButtons";
import LinkToUpdatePage from "../components/profile/linkToUpdate";
import HeaderInfo from "../components/common/header/Info";
import Footer from "../components/common/footer/Footer";
import ProfileTextInptCustomSelect from "../components/profile/customProfileSelect";
import PasswordPopup from "../components/password/PasswordPopup";
import UpdatePasswordmod from "../components/password/updateModal";
import { fetchUser } from "../redux/reducers/authSlice";

export const convertUrlToFile = async (url: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const filename = url.split("/").pop() || "profileImage";
  return new File([blob], filename, { type: blob.type });
};

const UpdateUserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state: RootState) => state.usersProfile);
  useEffect(() => {
    // @ts-ignore
    dispatch(getProfile());
  }, [dispatch]);
  // @ts-ignore
  const [imagePreview, setImagePreview] = useState<string>(
    // @ts-ignore
    profile?.profileImage,
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { loading, error } = useSelector(
    (state: RootState) => state.updateUsersProfile,
  );
  const [passwordModal, setPasswordModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    if (profile) {
      setValue("fullName", profile.fullName || "");
      setValue("gender", profile.gender || "");
      setValue("birthdate", profile.birthdate || "");
      setValue("preferredLanguage", profile.preferredLanguage || "");
      setValue("preferredCurrency", profile.preferredCurrency || "");
      setValue("street", profile.street || "");
      setValue("city", profile.city || "");
      setValue("state", profile.state || "");
      setValue("postalCode", profile.postalCode || "");
      setValue("country", profile.country || "");
      setImagePreview(profile.profileImage);
    }
  }, [profile, setValue]);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };
  interface UpdateProfileProps {
    fullName?: string;
    gender?: string;
    birthdate?: string;
    preferredLanguage?: string;
    preferredCurrency?: string;
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    profileImage?: File | null;
  }

  const onSubmit: SubmitHandler<UpdateProfileProps> = async (data) => {
    const formData = new FormData();
    if (selectedImage) {
      formData.append("profileImage", selectedImage);
    } else if (profile?.profileImage) {
      // @ts-ignore
      const newFile = await convertUrlToFile(profile.profileImage);
      formData.append("profileImage", newFile);
    }
    if (data.fullName) formData.append("fullName", data.fullName);
    if (data.gender) formData.append("gender", data.gender);
    if (data.birthdate) formData.append("birthdate", data.birthdate);
    if (data.preferredLanguage) formData.append("preferredLanguage", data.preferredLanguage);
    if (data.preferredCurrency) formData.append("preferredCurrency", data.preferredCurrency);
    if (data.street) formData.append("street", data.street);
    if (data.city) formData.append("city", data.city);
    if (data.state) formData.append("state", data.state);
    if (data.postalCode) formData.append("postalCode", data.postalCode);
    if (data.country) formData.append("country", data.country);
    try {
      const result = await dispatch(updateProfile(formData)).unwrap();
      toast.success("Profile updated successfully!");
      dispatch(fetchUser());
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`Error updating profile: ${error.message}`);
      } else {
        // @ts-ignore
        toast.error(`${error.message}`);
      }
    }
  };

  const selectGender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];
  const selectCurrency = [
    { value: "RWF", label: "RWF" },
    { value: "USD", label: "USD" },
  ];
  const loggedInUserToken = localStorage.getItem("accessToken");
  if (!loggedInUserToken) {
    navigate("/login");
  }
  return (
    <div className="parent-container h-screen overflow-auto">
      <div className="sticky top-0 w-[92%] ml-[4%] mr-[4%]">
        <HeaderInfo />
      </div>
      <div className="bg-gray-200 w-100% sm:w-[100%] h-[1px] mt-[0.1%]" />
      <div className="w-[92%]  overflow-y-hidden ml-[4%] mr-[4%]bg-yellow-100">
        <LinkToUpdatePage link="/">
          <p className="border-solid sm:border-none border-b-[1px] border-gray-200 ">
            <span className="text-gray-400 hover:text-[#DB4444]">Home</span>
            /My Account
          </p>
        </LinkToUpdatePage>
        <div className="w-full overflow-y-hidden">
          <ToastContainer />
          <p className="flex justify-center sm:justify-end mr-[1%] gap-2 p-2">
            Welcome
            <span className="text-[#DB4444]">
              {' '}
              {profile?.fullName}
            </span>
          </p>

          <div className="flex">
            <div className="hidden lg:flex w-[100%] h-[30rem] w-[96%]">
              <div className="hidden min-h-screen lg:flex w-[100%] xl:w-[90%]">
                <img
                  className="w-full h-[41rem] object-cover"
                  src={sideImage}
                  alt="Profile"
                />
              </div>
            </div>
            <div className="w-[100%] sm:w-[96%]">
              <h1 className="text-[#DB4444] text-lg font-normal">
                {" "}
                Update your profile
              </h1>
              {/* @ts-ignore */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 py-0 md:grid-cols-2 lg:grid-cols-2 w-[100%] gap-4">
                  <div className="text-lg pt-8 visible">
                    <h3>Profile Image</h3>
                  </div>
                  <div className="flex flex-col items-center">
                    <label
                      htmlFor="profileImage"
                      className=" w-20 h-20  mt-2 flex items-center justify-center cursor-pointer"
                    >
                      <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full h-full opacity-0 top-0 left-0 cursor-pointer"
                      />
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Profile Preview"
                          className="w-full h-full object-cover rounded-[50%]"
                        />
                      ) : (
                        <span>
                          <FaCircleUser size={80} color="gray" />
                        </span>
                      )}
                    </label>
                    <BiImageAdd className="mt-[-25px] ml-14 inset-0 bg-[#DB4444] h-[25%] w-[6%] text-white rounded-[50%]" />
                  </div>

                  <ProfileTextInput
                    label="Name"
                    defaultValue={profile?.fullName}
                    register={register}
                    name="fullName"
                    error={errors.fullName?.message}
                  />
                  <ProfileTextInptCustomSelect
                    label="Gender"
                    defaultValue={profile?.gender}
                    register={register}
                    name="gender"
                    type="select"
                    options={selectGender}
                  />
                  <ProfileTextInput
                    label="Birth date"
                    defaultValue={profile?.birthdate}
                    register={register}
                    name="birthdate"
                    type="date"
                    error={errors.birthdate?.message}
                  />
                  <ProfileTextInput
                    label="Preferred language"
                    defaultValue={profile?.preferredLanguage}
                    register={register}
                    name="preferredLanguage"
                    error={errors.preferredLanguage?.message}
                  />
                  <ProfileTextInptCustomSelect
                    label="Preferred currency"
                    defaultValue={profile?.preferredCurrency}
                    register={register}
                    name="preferredCurrency"
                    type="select"
                    options={selectCurrency}
                  />
                  <ProfileTextInput
                    label="Street"
                    defaultValue={profile?.street}
                    register={register}
                    name="street"
                    error={errors.street?.message}
                  />
                  <ProfileTextInput
                    label="City"
                    defaultValue={profile?.city}
                    register={register}
                    name="city"
                    error={errors.city?.message}
                  />
                  <ProfileTextInput
                    label="Postal Code"
                    defaultValue={profile?.postalCode}
                    register={register}
                    name="postalCode"
                    error={errors.postalCode?.message}
                  />
                  <ProfileTextInput
                    label="State"
                    defaultValue={profile?.state}
                    register={register}
                    name="state"
                    error={errors.state?.message}
                  />
                  <ProfileTextInput
                    label="Country"
                    defaultValue={profile?.country}
                    register={register}
                    name="country"
                    error={errors.country?.message}
                  />
                </div>
                <div className="flex flex-col md:flex-row md:items-center  py-2  md:justify-between">
                  <button
                    type="button"
                    className="bg-[#161616] whitespace-nowrap text-white px-2 py-2"
                    onClick={() => setPasswordModal(true)}
                  >
                    Update password
                  </button>
                  <div className="flex w-full justify-between md:justify-end items-center gap-4 text-none">
                    <LinkPages description="" link="/profile" text="Cancel" />
                    <Button
                      text={loading ? "Loading..." : "Save changes"}
                      backgroundColor="bg-[#DB4444]"
                      disabled={loading}
                      data-testid="updating-btn"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-2">
        <Footer />
      </div>
      {passwordModal && (
        <UpdatePasswordmod setPasswordModal={setPasswordModal} />
      )}
    </div>
  );
};

export default UpdateUserProfile;
