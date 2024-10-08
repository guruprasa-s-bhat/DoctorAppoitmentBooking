import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">
        All Doctors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {doctors && doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div
              className="bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-105"
              key={doctor._id}
            >
              <img
                className="w-full h-60 object-cover object-center rounded-t-lg"
                src={doctor.image}
                alt={doctor.name}
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {doctor.name}
                </h2>
                <p className="text-md text-gray-400 mb-4">
                  {doctor.speciality}
                </p>
                <div className="flex items-center">
                  <input
                    onChange={() => changeAvailability(doctor._id)}
                    type="checkbox"
                    checked={doctor.available}
                    className="h-6 w-6 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <p className="ml-2">Available</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 text-xl">
            No doctors available.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
