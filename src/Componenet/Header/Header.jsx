import React, { useRef, useState } from 'react';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";

import { MdDashboard, MdBarChart, MdSettings } from "react-icons/md";

import { FaWallet } from "react-icons/fa";



const Header = () => {

    const [show, setshow] = useState(false);
const [showExpense, setShowExpense] = useState(false);
const [animateExpense, setAnimateExpense] = useState(false);
const [amount,SetAmount] = useState("");
const [Source,setSource] = useState('');
const [Category, setCategory] = useState("");
 const[notes,setNotes] = useState("");
const [date,setDate] = useState("");
// const [amount,SetAmount] = useState("");
const [Expenses,setExpenses] = useState("");
const [Menu,setMenu] = useState("🍔");
const [View,setView] = useState(false);


const [Day,setDay] = useState("");




const [animate, setAnimate] = useState(false);

  const inputRef = useRef(null);
  const [profile, setProfile] = useState('/Profile.jpg');

  const openGallery = () => {
    inputRef.current.click();
  }; 
// React profile image upload and persist on page reload  => add the code 
const  Hamburger = ()=> {
  setView(prev => !prev);
}
   
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(URL.createObjectURL(file));
    }
  };
const SubmitHandler = (e) => {
  e.preventDefault(); // ✅ ADD THIS

  const data = JSON.parse(localStorage.getItem("data")) || [];

  const newdata = {
    type: "income",
    id: Date.now(),
    amount: amount,
    Source: Source,
    Category: Category,
    date: date,
    notes: notes,
  };

  data.push(newdata);

  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("newdata", JSON.stringify(newdata));

  // 🔥 notify Body
  window.dispatchEvent(new Event("storageUpdate"));

  setAnimate(false);
  setTimeout(() => setshow(false), 300);
};

const SubmitExpense = () => {
  if (!amount || !Expenses || !Menu || !Day) return;

  const data = JSON.parse(localStorage.getItem("data")) || [];

  const newExpense = {
    type: "expense",        // 🔴 IMPORTANT
    id: Date.now(),
    amount: amount,          // amount same key rakho
    Source: Expenses,       // merchant / expense name
    Category: Menu,         // emoji category
    date: Day,
    notes: notes,
  };

  data.push(newExpense);

  localStorage.setItem("data", JSON.stringify(data));
  localStorage.setItem("newdata", JSON.stringify(newExpense));

  // 🔥 Body ko notify karo
  window.dispatchEvent(new Event("storageUpdate"));

  // modal close
  setAnimateExpense(false);
  setTimeout(() => setShowExpense(false), 300);

  // optional reset
  SetAmount("");
  setExpenses("");
  setMenu("");
  setDay("");
};

  return (
  <div 
  className=".header
    h-20 w-full

    
    flex items-center justify-between
    
    sticky top-0 z-50

   
  "
>

        <div className='flex gap-6 ml-10 items-center'>
           {/* menu option */}


          {/* menuoption end */}
      {/* image change on click code  */}
      {/* <img
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
      /> */}
      {/* Text or name of the person  */}
      <h1 className='text-gray-500 font-semibold md:text-xl sm:text-[18px]'>HI , users <br></br>
      Welcome to <span className='text-slate-500  '>  Dashboard</span></h1>
</div>
      <div className=" space-x-3">
        {/* ADD income  */}
<button className="btn-income text-white px-3 py-1.5 font-semibold  mr-2 rounded-md  transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_45px_rgba(0,200,0,0.9)] active:translate-y-0 active:scale-95 cursor-pointer"   onClick={() => {
    setshow(true);
    setTimeout(() => setAnimate(true), 50); // smooth entry
  }}

> + Add Income</button>
{/* popup income charts  on click Add income */}
{show && (
<div
  onClick={() => {
    setAnimate(false);
    setTimeout(() => setshow(false), 300);
  }}
  className=" fixed inset-0 bg-black/80 flex items-center justify-center z-50"
>
  <div
    onClick={(e) => e.stopPropagation()}
    className={` 
      bg-white w-[90%] max-w-md p-6 rounded-2xl relative
      transform transition-all duration-300 ease-out
      ${animate ? "scale-100 opacity-100" : "scale-90 opacity-0"}
    `}
  >
    {/* Close button */}
    <button
      onClick={() => {
        setAnimate(false);
        setTimeout(() => setshow(false), 300);
      }}
      className="absolute top-3 right-3 text-gray-500 text-xl hover:text-red-500"
    >
      ✕
    </button>

    {/* Title */}
    <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
      Add Income
    </h2>

    {/* FORM */}
    <form className="flex flex-col gap-4" onSubmit={SubmitHandler}>
      
      {/* Amount */}
      <div>
        <label className="block text-sm font-semibold mb-1">Amount</label>
        <div className="relative">
          <FaIndianRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
          onChange={(e)=>{
            SetAmount(e.target.value)
          }}
            value={amount}
            type="number"
            placeholder="Enter amount"
            className="w-full pl-11 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>
      </div>

      {/* Source */}
      <div>
        <label className="block text-sm font-semibold mb-1">Source</label>
        <input 
          onChange={(e)=>setSource(e.target.value)}
          value={Source}
          type="text"
          placeholder="Salary / Freelance / Business"
          className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold mb-1">Category</label>
        <select 
         onChange={(e)=>{
          setCategory(e.target.value)
         }}
         value={Category}
          className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" required
        >
          <option value ="" disabled>Salary</option>
          <option value="💻">Freelance</option>
          <option value="🏢">Business</option>
          <option value="📈">Investment</option>
          <option value="📦">Other</option>
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-semibold mb-1">Date</label>
        <input
          onChange={ (e)=> setDate(e.target.value)

          }
          value={date}
          type="date"
          className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-semibold mb-1">Notes</label>
        <textarea
       
          rows="2"
          placeholder="Optional notes..."
          className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={() => {
            setAnimate(false);
            setTimeout(() => setshow(false), 300);
          }}
          className="w-1/2 py-2.5 rounded-lg border font-semibold hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="w-1/2 py-2.5 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Save Income
        </button>
      </div>
    </form>
  </div>
</div>

)}






{/* Add expenses */}
<button className=" btn-expense text-white  px-3 py-1.5 font-semibold  mr-2 rounded-md   transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105  active:translate-y-0 active:scale-95 cursor-pointer"
  onClick={() => {
    setShowExpense(true);
    setTimeout(() => setAnimateExpense(true), 50);
  }}> + Add expenses</button>
  {showExpense && (
  <div
    onClick={() => {
      setAnimateExpense(false);
      setTimeout(() => setShowExpense(false), 300);
    }}
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className={`  
        bg-white w-[90%] max-w-md p-6 rounded-2xl relative
        transform transition-all duration-300 ease-out
        ${animateExpense ? "scale-100 opacity-100" : "scale-90 opacity-0"}
      `}
    >
      {/* Close */}
      <button
        onClick={() => {
          setAnimateExpense(false);
          setTimeout(() => setShowExpense(false), 300);
        }}
        className="absolute top-3 right-3 text-gray-500 text-xl hover:text-red-600"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
        Add Expense
      </h2>

      {/* FORM */}
      <form className="flex flex-col gap-4">

        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold mb-1">Amount</label>
          <div className="relative">
            <FaIndianRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={amount}
              onChange={(e)=>SetAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full pl-11 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Expense Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">Expense For</label>
          <input
            type="text"
            value={Expenses}
            onChange={(e)=>setExpenses(e.target.value)}
            placeholder="Food, Rent, Travel..."
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold mb-1">Category</label>
          <select 
            value={Menu}
            onChange={(e)=>setMenu (e.target.value)
            }
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          >
            <option value="🍔">Food</option>
            <option value="🏠">Rent</option>
            <option value="🚗">Transport</option>
            <option value="🛒">Shopping</option>
            <option value="🎬">Entertainment</option>
            <option value="💡">Bills</option>
            <option value="📦">Other</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold mb-1">Date</label>
          <input
            value={Day}
            onChange={(e)=>setDay(e.target.value)}
            type="date"
            className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold mb-1">Notes</label>
       <textarea
  rows="2"
  value={notes}
  onChange={(e)=>setNotes(e.target.value)}
  placeholder="Optional notes..."
/>

        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
      <button
  type="button"
  onClick={() => {
    setAnimateExpense(false);
    setTimeout(() => setShowExpense(false), 300);
  }}
  className="w-1/2 py-2.5 rounded-lg border font-semibold hover:bg-gray-100"
>
  Cancel
</button>


<button
  type="button"   // ✅ CHANGE
  onClick={SubmitExpense}
  className="w-1/2 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
>
  Save Expense
</button>

        </div>
      </form>
    </div>
  </div>
)}
 


      </div>
    
    </div>
  );
};

export default Header;
