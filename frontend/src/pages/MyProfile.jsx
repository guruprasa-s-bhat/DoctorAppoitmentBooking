import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets_frontend/assets"; // Assuming you still need this import
import {
  FaEdit,
  FaSave,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaVenusMars,
  FaBirthdayCake,
} from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendurl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(userData.image || "");

  useEffect(() => {
    // If there's a new image, create a preview URL
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setImagePreview(objectUrl);

      // Clean up the object URL when component unmounts or image changes
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      // Set image preview from userData when there is no new image
      setImagePreview(userData.image);
    }
  }, [image, userData.image]);

  useEffect(() => {
    // Set the initial imagePreview when userData changes
    if (userData.image) {
      setImagePreview(userData.image);
    }
  }, [userData]);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("dob", userData.dob);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendurl}/api/user/update-profile`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.success);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null); // Reset image to null after saving
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleChange = (field, value) => {
    if (field.includes("address.")) {
      const addressField = field.split(".")[1];
      setUserData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }));
    } else {
      setUserData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const toggleEdit = () => {
    if (isEdit) updateUserProfileData(); // Save data when switching from edit to view
    setIsEdit((prev) => !prev);
  };

  return (
    userData && (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
            <button
              onClick={toggleEdit}
              className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
            >
              {isEdit ? (
                <FaSave className="mr-2" />
              ) : (
                <FaEdit className="mr-2" />
              )}
              {isEdit ? "Save" : "Edit"}
            </button>
          </div>

          {/* Profile Picture and Name */}
          <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
            <div className="relative group">
              <img
                src={imagePreview}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg transition-transform duration-300 transform group-hover:scale-105"
              />
              {isEdit && (
                <label
                  htmlFor="image"
                  className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  <FaEdit className="text-white text-xl" />
                  <input
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImage(e.target.files[0]);
                      }
                    }}
                    type="file"
                    id="image"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left w-full">
              {isEdit ? (
                <div className="flex items-center justify-center md:justify-start">
                  <FaUser className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="border-b-2 border-indigo-500 focus:outline-none focus:border-indigo-700 text-lg font-medium text-gray-800 w-full"
                  />
                </div>
              ) : (
                <h3 className="text-2xl font-semibold text-gray-800 flex items-center justify-center md:justify-start">
                  <FaUser className="text-indigo-500 mr-2" />
                  {userData.name}
                </h3>
              )}
              <p className="text-gray-600 mt-2">Patient</p>
            </div>
          </div>

          <hr className="border-t-2 border-gray-200 mb-6" />

          {/* Contact Information */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center">
                <FaEnvelope className="text-indigo-500 mr-3" />
                <p className="text-gray-800">{userData.email}</p>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-indigo-500 mr-3" />
                {isEdit ? (
                  <input
                    type="text"
                    value={userData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full border-b-2 border-indigo-500 focus:outline-none focus:border-indigo-700"
                    required
                  />
                ) : (
                  <p className="text-gray-800">{userData.phone}</p>
                )}
              </div>
              <div className="flex items-start">
                <FaHome className="text-indigo-500 mr-3 mt-1" />
                {isEdit ? (
                  <input
                    type="text"
                    value={userData.address.line1}
                    onChange={(e) =>
                      handleChange("address.line1", e.target.value)
                    }
                    className="w-full border-b-2 border-indigo-500 focus:outline-none focus:border-indigo-700 mb-2"
                    required
                  />
                ) : (
                  <p className="text-gray-800">{userData.address.line1}</p>
                )}
              </div>
              <div className="flex items-start">
                <FaHome className="text-indigo-500 mr-3 mt-1" />
                {isEdit ? (
                  <input
                    type="text"
                    value={userData.address.line2}
                    onChange={(e) =>
                      handleChange("address.line2", e.target.value)
                    }
                    className="w-full border-b-2 border-indigo-500 focus:outline-none focus:border-indigo-700"
                  />
                ) : (
                  <p className="text-gray-800">{userData.address.line2}</p>
                )}
              </div>
            </div>
          </div>

          <hr className="border-t-2 border-gray-200 mb-6" />

          {/* Basic Information */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">
              Basic Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center">
                <FaVenusMars className="text-indigo-500 mr-3" />
                {isEdit ? (
                  <select
                    value={userData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="border-b-2 border-indigo-500 focus:outline-none focus:border-indigo-700 w-full"
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{userData.gender}</p>
                )}
              </div>
              <div className="flex items-center">
                <FaBirthdayCake className="text-indigo-500 mr-3" />
                {isEdit ? (
                  <input
                    type="date"
                    value={userData.dob.split("T")[0]} // Format for input date
                    onChange={(e) => handleChange("dob", e.target.value)}
                    className="border-b-2 border-indigo-500 focus:outline-none focus:border-indigo-700 w-full"
                    required
                  />
                ) : (
                  <p className="text-gray-800">{userData.dob.split("T")[0]}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
