import React from 'react'
import { useState,useEffect } from 'react';
import { RiDeleteBinFill } from "react-icons/ri";
import ColumnChart from './ColumnChart';
import DonutChart from './DonutChart';
import { FaWallet } from "react-icons/fa";
import { FaArrowUp ,FaArrowDown } from "react-icons/fa6";


const Body = () => {
    const [balance, setBalance] = useState(0);



  const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });


 useEffect(() => {
  const loadData = () => {
    const data = JSON.parse(localStorage.getItem("data")) || [];

    // ✅ only recent 10 (latest first)
    const recentTen = data.slice(-10).reverse();

    setTransactions(recentTen);
  };

  loadData();

  window.addEventListener("storageUpdate", loadData);
  return () => window.removeEventListener("storageUpdate", loadData);
}, []);

 return (
  <div className="flex flex-col w-full min-h-screen  pt-5">

    {/* ================= CHART SECTION ================= */}
    <div
      className="
        bg-transparent
        grid grid-cols-1 sm:grid-cols-2
        gap-4
        px-2
        max-w-6xl w-full mx-auto
      "
    >
      {/* Monthly Spending */}
      <div className=" w-full  p-3 bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
        <h1 className="text-center text-gray-600 text-2xl mb-2">
          Monthly Spending
        </h1>
        <div className="w-full flex justify-center">
          <DonutChart sendBalance={setSummary} />
        </div>
      </div>

      {/* Weekly Spending */}
      <div className=" w-full  py-3 pr-3 pl-0 bg-white/40 backdrop-blur-xl rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
        <h1 className="text-center text-gray-600 text-2xl mb-2">
          Weekly Spending
        </h1>
        <div className="w-full flex justify-center">
          <ColumnChart />
        </div>
      </div>
    </div>
{/* ================= SPREAD SUMMARY CARDS ================= */}
<div className="max-w-6xl w-full mx-auto px-4 py-8">
  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
    
    {/* Balance Card: Full width on mobile (col-span-2), auto on desktop */}
    <button
     
      className="col-span-2 lg:col-span-1 w-full text-left relative overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-2 rounded-2xl border-b-4 border-indigo-900 shadow-xl transition-all duration-100 active:border-b-0 active:translate-y-1 hover:brightness-110"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs uppercase tracking-widest font-bold opacity-70">Total Balance</span>
        <FaWallet className="text-sm opacity-80" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight">₹{summary.balance.toLocaleString()}</h1>
    </button>

    {/* Income Card: Takes half width on mobile */}
    <button
      
      className="w-full text-left relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-2 rounded-2xl border-b-4 border-emerald-900 shadow-xl transition-all duration-100 active:border-b-0 active:translate-y-1 hover:brightness-110"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs uppercase tracking-widest font-bold opacity-70">Income</span>
        <FaArrowUp className="text-sm opacity-80" />
      </div>
      <h1 className="text-2xl font-bold">₹{summary.income.toLocaleString()}</h1>
    </button>

    {/* Expense Card: Takes half width on mobile */}
    <button
      
      className="w-full text-left relative overflow-hidden bg-gradient-to-br from-rose-500 to-red-600 text-white p-2 rounded-2xl border-b-4 border-rose-900 shadow-xl transition-all duration-100 active:border-b-0 active:translate-y-1 hover:brightness-110"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs uppercase tracking-widest font-bold opacity-70">Expenses</span>
        <FaArrowDown className="text-sm opacity-80" />
      </div>
      <h1 className="text-2xl font-bold">₹{summary.expense.toLocaleString()}</h1>
    </button>
    
  </div>
</div>

    {/* ================= RECENT BOOKING (UNCHANGED) ================= */}
    <div className="
      max-w-6xl w-full mx-auto mb-10
      bg-slate-900/80
      border border-white/10
      rounded-2xl
      shadow-[0_12px_40px_rgba(0,0,0,0.45)]
    ">
      <h1 className="text-2xl px-4 pt-4 font-bold text-white mb-3">
        Recent Booking
      </h1>

      <div className="
        grid grid-cols-4 px-4 py-3
        bg-white/5
        text-slate-300
        text-sm font-semibold
        border-b border-white/10
        rounded-t-xl
      ">
        <div>Category</div>
        <div>Merchant</div>
        <div>Date & Time</div>
        <div className="text-right">Amount</div>
      </div>

      {transactions.map((item) => (
        <div
          key={item.id}
          className={`
            grid grid-cols-4 px-4 py-3 items-center
            text-sm
            border-b border-white/5
            hover:bg-white/5 transition
            ${item.type === "income"
              ? "bg-emerald-400/10 text-emerald-300"
              : "bg-rose-400/10 text-rose-300"}
          `}
        >
          <div>{item.Category}</div>
          <div>{item.Source}</div>
          <div className="text-slate-400">{item.date}</div>
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

}

export default Body
