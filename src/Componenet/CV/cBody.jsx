import React from 'react'

const CVBody = () => {
  return (
    <div className='bg-purple-100 min-h-screen w-full'>
        <div className='w-full bg-yellow-300 '>hello</div>
        <div className='w-full bg-amber-500 flex flex-col'>
            <div className='max-w-6xl mx-auto  w-full bg-blue-500 flex flex-col '>            <h1>Recentbooking</h1>
          <div className="w-full bg-amber-50">

  {/* Header Row */}
  <div className="grid grid-cols-4 px-3 py-2 border border-black text-xl font-semibold">
    <div>Category Icon</div>
    <div>Merchant Name</div>
    <div>Date Time</div>
    <div className="text-right">Amount</div>
  </div>

  {/* Data Row */}
  <div className="grid grid-cols-4 px-3 py-2 border border-black text-xl">
    <div>🍔</div>
    <div>hello</div>
    <div>02 Feb 2026</div>
    <div className="text-right text-green-600">₹1200</div>
  </div>

</div>



            </div>
          
        </div>
    </div>
  )
}

export default CVBody