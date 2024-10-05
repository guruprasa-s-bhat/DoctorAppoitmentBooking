import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");
  const [fees, setFees] = useState("");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [speciality, setSpeciality] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocImg(file); // Set the File object directly
    }
  };

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image is not selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("about", about);
      formData.append("fees", Number(fees));
      formData.append("degree", degree);
      formData.append("speciality", speciality);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // Debugging: Log formData entries
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: { aToken },
        }
      );

      if (data.success) {
        toast.success(data.message);
        // Optionally, reset form fields here
        setDocImg(null);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("");
        setAbout("");
        setFees("");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setSpeciality("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(
          error.response.data.message ||
            "Failed to add doctor. Please try again."
        );
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from server. Please try again later.");
      } else {
        // Something else happened
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Doctor</h2>
      <div className="flex flex-col space-y-4">
        <label htmlFor="doc-img" className="flex flex-col items-center mb-4">
          <img
            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            alt="Upload Area"
            className="cursor-pointer mb-2 w-36 h-36 object-cover rounded-lg border border-dashed border-gray-300 hover:border-indigo-500 transition-colors duration-300"
          />
          <input
            type="file"
            id="doc-img"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
          <p className="text-gray-600 text-center">Upload doctor picture</p>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor Name
            </label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            >
              <option value="">Select Experience</option>
              {Array.from({ length: 15 }, (_, i) => (
                <option key={i} value={`${i + 1}`}>
                  {i + 1} Year
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fees
            </label>
            <input
              type="number"
              placeholder="Fees"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialty
            </label>
            <select
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            >
              <option value="Cardiology">Cardiology</option>
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Education
            </label>
            <input
              type="text"
              placeholder="Education"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              placeholder="Address 1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
            <input
              type="text"
              placeholder="Address 2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 mt-1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            About Doctor
          </label>
          <textarea
            placeholder="Write about doctor"
            rows={4}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
