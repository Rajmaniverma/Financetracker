import React from 'react'
import { Link } from 'react-router-dom'

const CVHead = () => {
  return (
    <div className="w-full h-20  flex items-center px-6 justify-between">
      <div className=''>
  <span className="logo text-[15px] sm:text-xl">
    Finance Tracker
  </span></div>
  <div className='flex  gap-x-1 sm:gap-x-3'>
      <button className='Sbtn  rounded-xl px-2 sm:px-4  border items-center py-1   text-white cursor-pointer hover:scale-105 
active:scale-95 
active:translate-y-[px]
transition-all 
duration-100 
ease-out
 '><Link to="/Signup">Signup</Link></button>
    <button className='Lbtn  rounded-xl px-2 sm:px-4   items-center py-1 ring-1 hover:ring-sky-400 bg-black text-white cursor-pointer hover:scale-105 
active:scale-95 
active:translate-y-[px]
transition-all 
duration-100 
ease-out
 '><Link to="/Login">Login</Link></button>
   
  </div>
</div>

  )
}

export default CVHead