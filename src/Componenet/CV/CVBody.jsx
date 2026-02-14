import React from "react";
import ColumnChart from "../Body/ColumnChart";
import { Link, useNavigate } from "react-router-dom";
import CvDonutChart from "./CvDonutChart";
import CvColumnChart from "./CvColumnChart";

const transactions = [
  {
    id: 1,
    category: "Food",
    source: "Zomato",
    date: "2026-02-09 14:30",
    amount: 450,
    type: "expense",
  },
  {
    id: 2,
    category: "Salary",
    source: "Company",
    date: "2026-02-08 10:00",
    amount: 25000,
    type: "income",
  },
  {
    id: 3,
    category: "Shopping",
    source: "Amazon",
    date: "2026-02-07 19:45",
    amount: 3200,
    type: "expense",
  },
];

const CVBody = () => {
  const navigate = useNavigate();
  const Submithandler = () => {
     navigate("/Login");
  }

  return (
    <div className="min-h-screen w-full px-4">

      {/* Charts Section */}
      <div
        className="
        max-w-6xl mx-auto
        grid grid-cols-1 sm:grid-cols-2
        gap-4
        place-items-center sm:place-items-stretch
      "
      >
        <div className="w-full rounded-xl bg-white/50 backdrop-blur-xl flex flex-col justify-center items-center p-4 mx-auto shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <h1 className="text-2xl text-gray-600 text-center mb-4">
            Monthly Expenses
          </h1>
         <CvDonutChart />
        </div>

        <div className="w-full rounded-xl p-4 mx-auto bg-white/50 backdrop-blur-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <h1 className="text-2xl text-gray-600 text-center mb-4">
            Weekly Expenses
          </h1>
          <CvColumnChart />
        </div>
      </div>

      {/* Action Buttons */}
<div className="max-w-6xl mb-5 w-full mx-auto mt-10 px-4">
  <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-evenly">
    
    {/* Balance Button: Full width on mobile, auto on desktop */}
    <button 
      onClick={Submithandler} 
      className="col-span-2 sm:w-60 rounded-2xl px-7 py-4 shadow-lg shadow-indigo-200 hover:scale-[0.98] active:scale-105 transition-all duration-200 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[17px] flex items-center justify-center gap-2"
    >
      <span className="opacity-80 text-sm uppercase tracking-wider">Total</span> Balance
    </button>

    {/* Add Income: Half width on mobile */}
    <button 
      onClick={Submithandler} 
      className="sm:w-60 rounded-2xl px-4 py-4 shadow-lg shadow-green-100 hover:scale-[0.98] active:scale-105 transition-all duration-200 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-[15px] sm:text-[17px] flex items-center justify-center"
    >
      + Income
    </button>

    {/* Add Expense: Half width on mobile */}
    <button 
      onClick={Submithandler} 
      className="sm:w-60 rounded-2xl px-4 py-4 shadow-lg shadow-red-100 hover:scale-[0.98] active:scale-105 transition-all duration-200 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-[15px] sm:text-[17px] flex items-center justify-center"
    >
      + Expense
    </button>
    
  </div>
</div>


      {/* Recent Booking */}
      <div className="max-w-6xl w-full mx-auto mb-10 border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
        <h1 className="text-2xl px-4 pt-4 font-bold text-white mb-3">
          Recent Booking
        </h1>

        <div className="grid grid-cols-4 px-4 py-3 bg-white/5 text-slate-700 text-sm font-semibold border-b border-white/10 rounded-t-xl">
          <div>Category</div>
          <div>Merchant</div>
          <div>Date & Time</div>
          <div className="text-right">Amount</div>
        </div>

        {transactions.map((item) => (
          <div
            key={item.id}
            className={`grid grid-cols-4 px-4 py-3 items-center text-sm border-b border-white/5 hover:bg-white/5 transition ${
              item.type === "income"
                ? "bg-emerald-400/10 text-emerald-700"
                : "bg-rose-400/10 text-rose-500"
            }`}
          >
            <div>{item.category}</div>
            <div>{item.source}</div>
            <div className="text-slate-600">{item.date}</div>
            <div
              className={`text-right font-semibold ${
                item.type === "income"
                  ? "text-emerald-400"
                  : "text-rose-400"
              }`}
            >
              {item.type === "income" ? "+" : "-"}₹{item.amount}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CVBody;
