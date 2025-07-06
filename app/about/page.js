import React from 'react'

export const metadata = {
      title: 'GetMeAChai - about us',
      description: 'Here you can find more information about GetMeAChai, a platform for creators to get funded by their fans.',
    };


const Page = () => {
return (
    <div>
        
        <main className="max-w-3xl mx-auto mt-13 px-4">
            <div className="bg-white rounded-lg shadow py-4 px-2 sm:p-6 m-1 sm:m-2 ">
                <div className="text-center text-2xl font-bold  pb-2 text-gray-900">About GetMeAChai</div>
                <p className="text-center text-lg pt-2 text-gray-700">
                    GetMeAChai is a platform for creators to get funded by their fans. It allows fans to buy a chai for their favorite creators as a way of showing appreciation and support.
                </p>
                <p className="text-center text-lg pt-5 text-gray-700"> 
                    The platform is designed to be simple and easy to use, with a focus on providing a seamless experience for both creators and fans.
                </p>
                
                <p className="text-center text-lg pt-5 text-gray-700">
                    If you are a creator looking for a way to connect with your fans and receive support, or if you are a fan looking for a way to show your appreciation for your favorite creators, GetMeAChai is the perfect platform for you. Join us today and start supporting your favorite creators!
                </p>
                <p className="text-center text-lg pt-5 text-gray-700">
                    Thank you for visiting GetMeAChai. We hope you enjoy using the platform and find it to be a valuable resource for connecting with your favorite creators.
                </p>
                <div className="text-center text-lg pt-5">
                    For any queries or suggestions, feel free to reach out to us at{' '}
                    <a href="mailto:pranavmavle8206@gmail.com" className="text-blue-900  hover:text-blue-800 underline">
                        pranavmavle8206@gmail.com
                    </a>
                </div>
            </div>
        </main>
    </div>
)
}

export default Page