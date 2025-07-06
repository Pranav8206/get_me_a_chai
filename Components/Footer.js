import React from 'react'

const Footer = () => {
  return (
    <div className="bg-[#e5e7eb] shadow text-black font-semibold text-sm sm:text-base w-full mt-2 sm:text-center flex flex-col sm:flex-row-reverse justify-between items-center px-2 sm:px-10 lg:px-44 py-1 ">
      <div className="space-x-6 flex justify-center py-1  rounded-full ">
          <a href="/" className="text-gray-600 hover:text-black transition">Home</a>
          <a href="/about" className="text-gray-600 hover:text-black transition">About</a>
          <a href="mailto:pranavmavle8206@gmail.com" className="text-gray-600 hover:text-black transition">Contact</a>
      </div>
      <hr className='w-full sm:hidden'/>
      <div className="flex sm:block justify-between sm:justify-center  sm:py-1 px-1">
        <div className="text-center">Created by Pranav Mavle</div>
        <div className=" text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} GetMeAChai. All rights reserved.
        </div>
      </div>
      
    </div>
  )
}

export default Footer
