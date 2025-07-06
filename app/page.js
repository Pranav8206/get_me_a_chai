import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="pt-10 text-black  ">
        <div className="flex flex-col items-center justify-center  space-y-4">
          <div className="text-3xl  sm:text-4xl font-black flex items-center space-x-2 pt-2">
            <span className="py-7">Buy me a Chai!</span>
            
            <Image src="/coffee-lover.gif" alt="Image" width="32" height="40"/>
          </div>
          <div className="text-center text-xl pb-3">
            Platform for Creators to Get funded from fans. Let's Start!
          </div>
          <div className="py-4">
            <Link href={"/login"}>
            <button
              type="button"
              className="text-black cursor-pointer bg-gradient-to-tr from-[#dddddd] via-[#aaaaaa] to-[#dddddd] hover:bg-gradient-to-br font-extrabold  rounded-full text-lg px-3 py-1 text-center me-2 mb-2"
            >
              Start Now
            </button></Link>
            <Link href={"/about"}>
            <button
              type="button"
              className="text-black cursor-pointer bg-gradient-to-br from-[#dddddd] via-[#aaaaaa] to-[#dddddd] hover:bg-gradient-to-tr font-extrabold  rounded-full text-lg px-3 py-1 text-center me-2 mb-2"
            >
              Read More
            </button></Link>
          </div>
        </div>
        <div className="bg-gray-300 opacity-50 h-0.5 mt-2"></div>

        <div>
          <div className="text-xl font-bold text-center pt-5 pb-2">
            Fans Can Buy A Chai To their favorite creator!
          </div>

          <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 mt-5 mb-5 px-2 text-center max-w-screen">
            <div className="flex flex-col items-center justify-center pt-2">
              
              <Image className="bg-gray-200 size-20 rounded-full" src="/gif1.gif" alt="Image" width="80" height="80"/>
              <span className="text-lg font-medium">Turn Gratitude into Chai.</span>
              <span className="text-base">
                Support your favorite creators directly.
              </span>
            </div>

            <div className="flex flex-col items-center justify-center pt-2">
              <Image className="bg-gray-200 size-20 rounded-full" src="/gif2.gif" alt="Image" width="80" height="80"/>
              <span className="text-lg font-medium">
                Encourage what you love.
              </span>
              <span className="text-base">
                A Little Money. A Lot of Meaning.
              </span>
            </div>

            <div className="flex flex-col items-center justify-center pt-2">
              <Image className="bg-gray-200 size-20 rounded-full" src="/gif4.gif" alt="Image" width="80" height="80"/>
              <span className="text-lg font-medium">Buy a Chai, Boost a Dream.</span>
              <span className="text-base">
                Even stars shine brighter with support.
              </span>
            </div>

            <div className="flex flex-col items-center justify-center pt-2">
              <Image className="bg-gray-200 size-20 rounded-full" src="/gif3.gif" alt="Image" width="80" height="80"/>
              <span className="text-lg font-medium">Tiny Support, Big Impact</span>
              <span className="text-base">
                Turn Appreciation into Action — Send a Chai!
              </span>
            </div>

            <div className="flex flex-col items-center justify-center pt-2">
              <Image className="bg-gray-200 size-20 rounded-full" src="/gif6.gif" alt="Image" width="80" height="80"/>
              <span className="text-lg font-medium">Your Chai, Their Fuel.</span>
              <span className="text-base">
                Small support. Big impact.
              </span>
            </div>

            <div className="flex flex-col items-center justify-center pt-2">
              <Image className="bg-gray-200 size-20 rounded-full" src="/gif5.gif" alt="Image" width="80" height="80"/>
              <span className="text-lg font-medium">Creators Create. Fans Fuel.</span>
              <span className="text-base">
                Say thanks with a warm cup.
              </span>
            </div>
          </div>

        </div>
          
        <div className="bg-gray-300 opacity-50 h-0.5 mt-2"></div>

        <div>
          <div className="text-xl font-bold text-center pt-5 pb-2">
            Learn More About Us!
          </div>

          <iframe className="mx-auto max-w-screen" width="560" height="315" src="https://www.youtube.com/embed/9xwCnpYKxrc?si=nVbRAAAWhYnLQYiI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>




      </div>
    </>
  );
}


export const metadata = {
      title: 'GetMeAChai - Buy me a Chai!',
      description: 'A platform for creators to get funded by their fans. Buy a Chai for your favorite creator!',
    };