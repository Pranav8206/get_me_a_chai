import React, { use } from 'react'
import Paymentpage from '@/Components/Paymentpage'
import { notFound } from 'next/navigation'
import User from '@/models/User'
import connectDB from '@/db/connectDB'

const Username = async ({params}) => {
  const { username } = params;
  console.log("Username pm:", username);

  const checkUser = async () => {
    await connectDB()
    console.log("Connected to DB");
    let u = await User.findOne({ username: username})
    console.log("User found:", u);
    if (!u){
      console.log("User not found")
      
      return notFound()
    }
  }
  await checkUser()

  return (
  <>
    <Paymentpage username={username}/>
  </>
  )
}

export default Username

export async function generateMetadata({params}) {
  const { username } = params;
  return {
    title: `Support ${username} - GetMeAChai `,
    description: `Buy a Chai for ${username} and support them!`,
  }
}