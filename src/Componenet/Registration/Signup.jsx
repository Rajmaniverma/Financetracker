import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Select from "react-select";
import countries from "world-countries";
import { CgProfile } from "react-icons/cg";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Convert country data for react-select
  const countryOptions = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: `https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png`,
  }));
  const handleSignup = (e) => {
  e.preventDefault();        // ⛔ stop auto submit
  navigate("/Otp");          // ✅ go to OTP page
};


  return (
    <div className="min-h-screen fixed inset-0 bg-linear-to-r from-[#0F1A2B] via-[#312EB1] to-[#331d5A] flex items-center justify-center px-4">
     <div className="
  relative
  bg-white/10
  backdrop-blur-xl
  border border-[#22D3EE]/20
  w-full max-w-md
  rounded-2xl
  shadow-[0_8px_32px_rgba(0,0,0,0.35)]
  p-8
  text-white
">
    <div className="
  pointer-events-none
  absolute inset-0
  rounded-2xl
  bg-gradient-to-br
  from-white/20
  via-white/5
  to-transparent
" />

        <h2 className="text-3xl font-semibold text-gray-900 text-center">
          Create Account
        </h2>

        <form className="mt-8 space-y-5" onSubmit={handleSignup}>
                <div className="relative w-full">
            <CgProfile className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required
            />
          </div>

          {/* Email */}
          <div className="relative w-full">
            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required
            />
          </div>

          {/* Password */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required
            />

            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Country Select */}
          <Select
            value={selectedCountry}
            onChange={setSelectedCountry}
            options={countryOptions}
            placeholder="Select Country"
            menuPortalTarget={document.body}
            menuPosition="fixed"
            formatOptionLabel={(country) => (
              <div className="flex items-center gap-2 ">
                <img
                  src={country.flag}
                  alt={country.label}
                  className="w-5 h-4 rounded-sm"
                />
                <span>{country.label}</span>
              </div>
            )}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              control: (base) => ({
                ...base,
                borderRadius: "8px",
              }),
            }}
          />

          {/* Signup Button */}
          <button
            type="submit"
            disabled={!selectedCountry}
            className="w-full bg-blue-600 disabled:bg-blue-300 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Signup
          </button>

        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/Login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Signup;
