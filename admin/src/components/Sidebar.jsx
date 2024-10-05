import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets_admin/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="bg-white shadow-md w-64 h-[870px] p-5 hidden md:block">
      {aToken && (
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center p-2 text-gray-700 rounded-lg hover:bg-indigo-100 transition duration-300 ${
                  isActive ? "bg-indigo-100" : ""
                }`
              }
            >
              <img
                src={assets.home_icon}
                alt="Dashboard Icon"
                className="h-6 w-6 mr-3"
              />
              <p>Dashboard</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                `flex items-center p-2 text-gray-700 rounded-lg hover:bg-indigo-100 transition duration-300 ${
                  isActive ? "bg-indigo-100" : ""
                }`
              }
            >
              <img
                src={assets.appointment_icon}
                alt="Appointments Icon"
                className="h-6 w-6 mr-3"
              />
              <p>Appointments</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `flex items-center p-2 text-gray-700 rounded-lg hover:bg-indigo-100 transition duration-300 ${
                  isActive ? "bg-indigo-100" : ""
                }`
              }
            >
              <img
                src={assets.add_icon}
                alt="Add Doctor Icon"
                className="h-6 w-6 mr-3"
              />
              <p>Add Doctor</p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `flex items-center p-2 text-gray-700 rounded-lg hover:bg-indigo-100 transition duration-300 ${
                  isActive ? "bg-indigo-100" : ""
                }`
              }
            >
              <img
                src={assets.people_icon}
                alt="Doctors List Icon"
                className="h-6 w-6 mr-3"
              />
              <p>Doctors List</p>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
