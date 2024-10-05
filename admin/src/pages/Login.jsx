import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success(data.message); // Success toast
        } else {
          toast.error(data.message); // Error toast
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again."); // General error toast
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={onSubmitHandler}>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold mb-2">
              <span className="text-indigo-600">{state}</span> Login
            </h2>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded-md hover:bg-gradient-to-l hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            Login
          </button>

          {state === "Admin" ? (
            <p className="mt-4 text-center text-sm text-gray-600">
              Doctor Login?{" "}
              <span
                onClick={() => setState("Doctor")}
                className="text-indigo-600 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          ) : (
            <p className="mt-4 text-center text-sm text-gray-600">
              Admin Login?{" "}
              <span
                onClick={() => setState("Admin")}
                className="text-indigo-600 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
