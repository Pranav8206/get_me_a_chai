"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
import { fetchuser, updateProfile, fetchpayments } from '@/actions/userAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';


const dashboard = () => {
  const { data: session } = useSession()
  const router = useRouter();
  const [form, setform] = useState({})

  useEffect(() => {
    document.title = "GetMeAChai - Dashboard";
    if (!session) {
      router.push('/login');
    }
    else {
      getdata()
    }
  }, [router, session]);

  const getdata = async () => {
    let u = await fetchuser(session?.user?.name)
    setform(u)
  }

  const handleSubmit = async (e) => {
    let a = await updateProfile(e, session.user.name)
    toast('✅Profile updated!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
      router.push('/dashboard');
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className='pt-12 text-black text-xl md:text-2xl font-bold pb-2 text-center'>Welcome to your Dashboard</div>
      <div className='shadow-lg text-black rounded-2xl mb-5 border border-gray-200 mx-5 sm:mx-10  md:mx-30 lg:mx-60'>
        <form className='form w-full  px-5 sm:px-10 sm:pl-30 py-2 sm:py-5 space-y-3' action={handleSubmit}>
          <div className='flex flex-col items-start space-y-0.5'>
            <label htmlFor="name" className='font-semibold'>Name</label>
            <input value={form.name ? form.name : ""} onChange={handleChange} id="name" name="name" type="text" className='w-full sm:w-2/3  px-3 py-1 rounded bg-gray-200 border border-gray-400' />
          </div>
          <div className='flex flex-col items-start space-y-0.5'>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input value={form.email ? form.email : ""} readOnly id="email" name="email" type="email" className='w-full sm:w-2/3 px-3 py-1 rounded bg-gray-200 border border-gray-400' />
          </div>
          <div className='flex flex-col items-start space-y-0.5'>
            <label htmlFor="username" className='font-semibold'>Username</label>
            <input value={form.username ? form.username : ""} onChange={handleChange} id="username" name="username" type="text" className='w-full sm:w-2/3 px-3 py-1 rounded bg-gray-200  border border-gray-400' />
          </div>
          <div className='flex flex-col items-start space-y-1'>
            <label htmlFor="profilePic" className='font-semibold'>Profile Picture</label>
            <input value={form.profilePic ? form.profilePic : ""} onChange={handleChange} id="profilePic" name="profilePic" type="text" className='w-full sm:w-2/3 px-3 py-1 rounded bg-gray-200  border border-gray-400' placeholder='(Paste link👇)' />
          </div>
          <div className='flex flex-col items-start space-y-1'>
            <label htmlFor="coverPic" className='font-semibold'>Profile Cover</label>
            <input value={form.coverPic ? form.coverPic : ""} onChange={handleChange} id="coverPic" name="coverPic" type="text" className='w-full sm:w-2/3 px-3 py-1 rounded bg-gray-200  border border-gray-400' placeholder='(Paste link👇)' />
          </div>

          <div className='items-start text-sm text-gray-500 mb-2 text-center sm:w-2/3  px-3 py-1'>
            (Enter your correct Razorpay credentials to start receiving payments from your fans.)
          </div>
          
          <div className='flex flex-col items-start space-y-0.5'>
            <label htmlFor="RazorpayId" className='font-semibold'>Razorpay id</label>
            <input value={form.RazorpayId ? form.RazorpayId : ""} onChange={handleChange} id="RazorpayId" name="RazorpayId" type="text" className='w-full sm:w-2/3  px-3 py-1 rounded bg-gray-200  border border-gray-400 ' placeholder='We keep it private🔒' />
          </div>
          <div className='flex flex-col items-start space-y-0.5'>
            <label htmlFor="RazorpaySecret" className='font-semibold'>Razorpay secret</label>
            <input value={form.RazorpaySecret ? form.RazorpaySecret : ""} onChange={handleChange} id="RazorpaySecret" name="RazorpaySecret" type="password" className='w-full sm:w-2/3  px-3 py-1 rounded bg-gray-200  border border-gray-400 ' placeholder='We keep it protected🔒' />
          </div>
          <button type="submit" className='cursor-pointer mt-3 w-fit ml-[32%]  px-6 py-2 bg-black text-white rounded'>Save</button>
        </form>
      </div>

    </>
  )
}

export default dashboard


