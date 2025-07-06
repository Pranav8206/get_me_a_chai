"use client"
import React,{useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropdown, setshowdropdown] = useState(false)

  const email = session?.user?.email || "z";
  const firstLetter = email.charAt(0).toUpperCase();

  return (
    <div className="z-30 fixed top-0 left-0 right-0 bg-[#e5e7eb] shadow text-black">
      <div className="container mx-auto">
        <div className="flex justify-between items-center ">
          <Link href={"/"}>
            <div className="text-lg font-bold italic flex items-center p-1">
              <img className='w-5 h-5 ' src="/image.png" alt="Logo" />
              <div className='pt-1'>GetMeAChai!</div>
            </div>
          </Link>
          <div className="flex items-center space-x-1">

            {session && <div className='relative '>

              <button onClick={()=>{setshowdropdown(!showdropdown)}} onBlur={()=>{setTimeout(() => {setshowdropdown(false)}, 100); }} id="dropdownAvatarNameButton"  className="flex items-center text-sm font-bold rounded-full focus:ring-1 text-gray-700  hover:bg-gradient-to-r hover:from-[#bbbbbb] hover:to-[#999999] bg-[#bbbbbb] text-center cursor-pointer px-1 py-0.5 border border-black max-h-9 truncate" type="button">
                <span className='Circle bg-gray-500 rounded-full size-6 text-black py-0.5'>{firstLetter}</span>
                <span className='pl-1 text-lg  truncate max-w-25.5 sm:max-w-100' title={session.user?.name}>
                {session.user?.name?.split(" ")[0] || "User"}
                </span>
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              <div id="dropdownAvatarName" className={`z-10 ${showdropdown?"absolute":"hidden"} top-10 right-1 bg-gray-400 divide-y divide-gray-100 text-black rounded-lg shadow-2xl w-44 sm:w-50 `}>
                <div className="px-4 py-3 text-sm font-bold ">
                  <div className="truncate" title={session.user.email}>{session.user.email}</div>
                </div>
                <ul className="py-2 text-sm text-black " aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                  <li>
                    <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-300 hover:font-bold">Profile</Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-300 hover:font-bold">Dashboard</Link>
                  </li>
                  {/* <li>
                    <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link>
                  </li> */}
                </ul>
                <div className="py-2">
                  <button onClick={()=>signOut({ callbackUrl: '/' })}>
                  <Link href="" className="block px-3 mx-1 py-2 text-sm text-black  hover:bg-gray-500 rounded-full">Sign out</Link>
                  </button>
                </div>
              </div>
            </div>
            }
            {!session &&
              <Link href={"/login"}><button className="text-black  hover:bg-gradient-to-r hover:from-[#bbbbbb] hover:to-[#999999] bg-[#bbbbbb] font-extrabold text-base text-center   pb-0.5 cursor-pointer  px-2 py-0.5 rounded-xl border border-black mr-1 sm:mr-0">Login</button>
              </Link>}
            {/* <div className='hidden'>
                <ul className="flex space-x-4">
                <li><Link href="#" className="hover:text-gray-600 text-black">Home</Link></li>
                <li><Link href="#" className="hover:text-gray-600 text-black">About</Link></li>
                <li><Link href="#" className="hover:text-gray-600 text-black">Contact</Link></li>
                </ul>
            </div> */}
          </div>
        </div>

        <div></div>
      </div>
    </div>
  )
}

export default Navbar
