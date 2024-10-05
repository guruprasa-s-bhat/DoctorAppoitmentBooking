import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai"; // Import an icon

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    setAToken("");
    localStorage.removeItem("aToken");
    navigate("/");
  };

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={assets.admin_logo}
            alt="Admin Logo"
            className="h-10 w-auto"
          />
          <p className="ml-4 text-xl font-semibold text-gray-800 hover:bg-opacity-100 transition duration-300 py-1 px-3 rounded-lg shadow-md">
            {aToken ? "Admin" : "Doctor"}
          </p>
        </div>
        <button
          onClick={logout}
          className="flex items-center bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-500 transition duration-300 shadow-lg"
        >
          <AiOutlineLogout className="mr-2" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
