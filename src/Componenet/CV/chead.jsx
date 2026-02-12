import React, { useRef, useState, useEffect } from 'react';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const CVHead = () => {
    const navigate = useNavigate();
    const Login = () => {
        navigate("/Login")}
            const Signup = () => {
        navigate("/Signup")}
  const inputRef = useRef(null);

  // Load image from localStorage OR default image
  const [profile, setProfile] = useState(() => {
    return localStorage.getItem("profileImage") || "./Profile.jpg";
  });

  const openGallery = () => {
    inputRef.current.click();
  };

  // Handle image change
  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfile(imageURL);
      localStorage.setItem("profileImage", imageURL);
    }
  };

  // Cleanup object URL (memory optimization)
  useEffect(() => {
    return () => {
      if (profile.startsWith("blob:")) {
        URL.revokeObjectURL(profile);
      }
    };
  }, [profile]);

  return (
    <div className="h-20 w-full bg-linear-to-br from-black via-red-500 to-red-800 flex items-center px-4 justify-between sticky">
      
      <div className="flex gap-6 ml-10 items-center">
        
        {/* Profile Image */}
        <img
          src={profile}
          onClick={openGallery}
          className="h-12 w-12 rounded-full object-cover cursor-pointer border-2 border-white"
          alt="profile"
        />

        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleChange}
          hidden
        />

        {/* Greeting */}
        <h1 className="text-gray-500 font-semibold text-xl">
          HI, users <br />
          Welcome to your <span className="text-gray-400">Finance Tracker!</span>
        </h1>
      </div>

      <div className="space-x-3">

 <div className="flex items-center gap-3">

  {/* Login Button */}
  <button
    className="
      group relative overflow-hidden
      px-4 py-2 rounded-lg font-semibold text-white
      bg-linear-to-r from-green-400 via-green-500 to-green-600
      border border-green-300/40
      shadow-md shadow-green-500/30
      transition-all duration-300 ease-out
      hover:-translate-y-0.5 hover:scale-105
      hover:shadow-lg hover:shadow-green-500/60
      active:scale-95 cursor-pointer
    " onClick={Login}
  >
    <span className="relative z-10">Login</span>

    {/* glow layer */}
    <span
      className="
        absolute inset-0 bg-green-400/20 blur-xl
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300 
      "
    />
  </button>

  {/* Create Account Button */}
  <button
    className="
      group relative overflow-hidden
      px-4 py-2 rounded-lg font-semibold text-white
      bg-linear-to-r from-purple-400 via-purple-500 to-purple-600
      border border-purple-300/40
      shadow-md shadow-purple-500/30
      transition-all duration-300 ease-out
      hover:-translate-y-0.5 hover:scale-105
      hover:shadow-lg hover:shadow-purple-500/60
      active:scale-95 cursor-pointer
    "
 onClick={Signup}
  >
    <span className="relative z-10">Create Account</span>

    {/* glow layer */}
    <span
      className="
        absolute inset-0 bg-purple-400/20 blur-xl
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
      "
    />
  </button>

</div>


      </div>
    </div>
  );
};

export default CVHead;
