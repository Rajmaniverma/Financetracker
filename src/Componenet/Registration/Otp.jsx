import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  // Generate OTP on mount
  useEffect(() => {
    const value = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(value);
    alert(`OTP sent: ${value}`); // demo purpose only
  }, []);

  const verifyOtp = (e) => {
    e.preventDefault();

    if (otp !== generatedOtp) {
      alert("❌ Invalid OTP");
      return;
    }

    // ✅ Save signup status
    localStorage.setItem("isSignupIn", "true");

    alert("✅ Signup successful!");
    navigate("/Home", { replace: true });
  };

  return (
    <div className="min-h-screen fixed inset-0 bg-linear-to-r from-white via-sky-100 to-sky-500 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-semibold text-center">
          Verify OTP
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Enter the 6-digit OTP sent to you
        </p>

        <form className="mt-8 space-y-5" onSubmit={verifyOtp}>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6 digit OTP"
            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Verify OTP
          </button>
        </form>

      </div>
    </div>
  );
};

export default Otp;
