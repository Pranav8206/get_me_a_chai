import React, { use } from 'react'
import Paymentpage from '@/Components/Paymentpage'
import { notFound } from 'next/navigation'
import User from '@/models/User'
import connectDB from '@/db/connectDB'

const Username = async ({params}) => {
  const { username } = params;

  const checkUser = async () => {
    await connectDB()
    let u = await User.findOne({ username: username})
    if (!u){      
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