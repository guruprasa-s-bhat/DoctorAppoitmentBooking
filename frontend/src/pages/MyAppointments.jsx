import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="p-4">
      <p className="text-2xl font-semibold mb-4">My Appointments</p>
      <div className="grid md:grid-cols-2 gap-6">
        {doctors.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-lg p-4 flex flex-col md:flex-row items-center"
          >
            <div className="w-full md:w-1/3">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-2/3 p-4">
              <p className="text-lg font-bold">{item.name}</p>
              <p className="text-gray-600">{item.speciality}</p>
              <p className="text-sm text-gray-500">Address:</p>
              <p className="text-sm">{item.address.line1}</p>
              <p className="text-sm">{item.address.line2}</p>
              <p className="text-sm mt-2">
                <span className="font-semibold">Date & Time:</span> 25, July,
                2024 | 8.30 PM
              </p>
              <div className="mt-4 flex space-x-2">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                  Pay Online
                </button>
                <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
