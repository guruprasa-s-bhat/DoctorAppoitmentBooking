import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Fetch Doctor Information
  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  // Generate Available Slots
  const getAvailableSlots = () => {
    const slots = [];

    // Get current date
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Set end time to 21:00 for the current day
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      // Set start time
      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0);
      }

      // Generate time slots
      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30); // Increment by 30 minutes
      }

      slots.push(timeSlots);
    }
    setDocSlot(slots);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return (
    docInfo && (
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-md shadow-md">
        {/* ----------------Doctor Details---------------*/}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <img
                src={docInfo.image}
                alt={docInfo.name}
                className="w-40 h-40 rounded-full object-cover shadow-md"
              />
            </div>

            <div>
              <p className="text-2xl font-semibold text-gray-800 flex items-center">
                {docInfo.name}
                <img
                  src={assets.verified_icon}
                  alt="Verified"
                  className="w-5 h-5 ml-2"
                />
              </p>
              <p className="text-lg text-gray-600 mt-2">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                {docInfo.experience} Years of Experience
              </button>
            </div>
          </div>

          {/* ----------------Doctor About Section---------------*/}
          <div className="mt-8">
            <p className="text-xl font-medium text-gray-800 flex items-center">
              About
              <img src={assets.info_icon} alt="Info" className="w-5 h-5 ml-2" />
            </p>
            <p className="mt-4 text-gray-700">{docInfo.about}</p>
          </div>

          {/* Appointment Fee Section */}
          <div className="mt-4 border-t border-gray-300 pt-4">
            <p className="text-lg font-semibold text-gray-800">
              Appointment fee:{" "}
              <span className="text-blue-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* ----------------Booking Slots Section---------------*/}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlot.length > 0 &&
              docSlot.map((item, index) => (
                <div
                  key={index}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                  onClick={() => setSlotIndex(index)} // Set the selected slot index
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlot.length &&
              docSlot[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrin-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 ">
            Book an Appointment
          </button>
        </div>
        {/*-------- related doctors component-------*/}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
