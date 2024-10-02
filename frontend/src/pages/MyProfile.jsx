import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
// Importing only necessary icons to avoid import issues
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

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Guruprasad",
    image: assets.profile_pic,
    email: "guruprasad@gmail.com",
    phone: "7799667879",
    address: {
      line1: "123 Main Street",
      line2: "Apt 4B, Springfield",
    },
    gender: "male",
    dob: "2000-01-21",
  });
  const [isEdit, setIsEdit] = useState(false);

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
    setIsEdit(!isEdit);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
          <button
            onClick={toggleEdit}
            className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            {isEdit ? <FaSave className="mr-2" /> : <FaEdit className="mr-2" />}
            {isEdit ? "Save" : "Edit"}
          </button>
        </div>

        {/* Profile Picture and Name */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
          <div className="relative">
            <img
              src={userData.image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
            />
            {isEdit && (
              <div className="absolute bottom-0 right-0 bg-indigo-500 text-white rounded-full p-2 cursor-pointer hover:bg-indigo-600 transition">
                <FaEdit />
              </div>
            )}
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
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
            {/* Email - Read Only */}
            <div className="flex items-center">
              <FaEnvelope className="text-indigo-500 mr-3" />
              <p className="text-gray-800">{userData.email}</p>
            </div>
            {/* Phone */}
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
            {/* Address Line 1 */}
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
            {/* Address Line 2 */}
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
            {/* Gender */}
            <div className="flex items-center">
              <FaVenusMars className="text-indigo-500 mr-3" />
              {isEdit ? (
                <select
                  value={userData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="w-full border-b-2 border-indigo-500 focus:outline-none focus:border-indigo-700"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <p className="text-gray-800 capitalize">{userData.gender}</p>
              )}
            </div>
            {/* Birthday */}
            <div className="flex items-center">
              <FaBirthdayCake className="text-indigo-500 mr-3" />
              {isEdit ? (
                <input
                  type="date"
                  value={userData.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className="w-full border-b-2 border-indigo-500 focus:outline-none focus:border-indigo-700"
                  required
                />
              ) : (
                <p className="text-gray-800">
                  {new Date(userData.dob).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={toggleEdit}
            className={`flex items-center px-6 py-2 rounded-md transition duration-300 ${
              isEdit
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          >
            {isEdit ? <FaSave className="mr-2" /> : <FaEdit className="mr-2" />}
            {isEdit ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
