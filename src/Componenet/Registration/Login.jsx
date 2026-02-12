import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };
const submithandler = () => {
  navigate("/Home")
}
  return (
    <div className="min-h-screen fixed inset-0 bg-linear-to-r from-white via-sky-100 to-sky-500 flex items-center justify-center px-4">
      <div className="bg-linear-to-b from-white via-white to-sky-200 w-full max-w-md rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-semibold text-gray-900 text-center">
          Login
        </h2>

        <form className="mt-8 space-y-5" onSubmit={(submithandler)}>

          {/* Email Input */}
          <div className="relative w-full">
            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="email"
              placeholder="Email"
              className="
                w-full pl-10 pr-3 py-2
                border border-gray-300 rounded-md
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full mb-20">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="
                w-full px-4 py-2 pr-10
                border border-gray-300 rounded-md
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />

            <button
              type="button"
              onClick={togglePassword}
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                text-gray-500 hover:text-purple-500 
              "
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Don't  have an account?{" "}
          <span
            onClick={() => navigate("/Signup")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;
