"use client";
import React, {  useState, useEffect } from 'react';
import Script from 'next/script';
import { fetchpayments, initialize, fetchuser } from '@/actions/userAction';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';


const Paymentpage = ({ username }) => {

  const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
  const [currentuser, setcurrentuser] = useState({})
  const [payments, setPayments] = useState([])
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast('😊Payment has been made!', {
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
      router.push(`${username}`)
    }

  }, [])


  const handlechange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
  }

  const getData = async () => {
    let u = await fetchuser(username)
    setcurrentuser(u);

    let dbpayments = await fetchpayments(username)
    setPayments(dbpayments)
  }


  const pay = async (amount) => {
    try {
      console.log("Calling initialize...");
      console.log(paymentform, amount, username)
      const a = await initialize(amount, username, paymentform);
      console.log("Initialize success:", a);

      const orderId = a.id;
      console.log("Order ID:", orderId);



      var options = {
        key: currentuser.RazorpayId,// Enter the Key ID generated from the Dashboard
        "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Get Me A Chai", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          "name": "Gaurav Kumar", //your customer's name
          "email": "gaurav.kumar@example.com",
          "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }

      }

      var rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment failed", error);
      toast.error("Payment initialization failed.");
    }
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
        <section className="relative pt-10 text-center text-black">
          <img className="w-full h-48 sm:h-72 object-cover  shadow text-gray-500  italic font-extralight"
            src={currentuser.coverPic || "/profile1bg.png"}
            alt="link invalid! (update from your dashboard.)" />
          <img className="profilepic z-10 bg-gray-200 w-24 h-24 sm:w-28 sm:h-28 rounded-xl border-4 border-white shadow-lg absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            src={currentuser.profilePic || "/profile1dp.png"}
            alt="Profile"
          />
        </section>
        <section className="pt-16 text-center text-black">
          <div className="font-extrabold text-3xl max-w-xs mx-auto truncate">@{username}</div>
          <div className="py-2 text-lg text-gray-700">Let's help by giving a chai.</div>
          <div className="font-medium text-gray-500">{payments.length} Payments .   ₹{payments.reduce((a, b) => a + b.amount, 0)} raised</div>
        </section>
        <section className="payments my-10 flex flex-col-reverse sm:flex-row justify-center items-stretch gap-6 sm:gap-10 px-4 sm:px-10 md:px-10 lg:px-44">
          <div className="supporters sm:w-1/2 md:w-[600px] lg:w-1/2 bg-white shadow-lg rounded-2xl p-6 border border-gray-200 flex flex-col justify-between ">
            <div className="font-bold text-2xl mb-4 text-gray-700">Supporters</div>
            <ul className="pl-2 sm:pl-5 text-gray-700 text-base max-h-61 pt-20 md:border lg:border-none sm:pt-72 md:pt-30 lg:pt-43  overflow-y-auto flex flex-col justify-center">
              {payments.length == 0 && <li>No payments yet.</li>}
              {payments.map((p, idx) => {
                return <li key={idx}>
                  <div className='flex items-center justify-start'>
                    <span className='shadow px-0.5 mr-1 border  bg-[#d7dce6] rounded-2xl'>
                      <lord-icon
                        src="https://cdn.lordicon.com/kdduutaw.json"
                        trigger="hover"
                        state="hover-looking-around"
                        style={{ width: '25px', height: '25px' }}>
                      </lord-icon>
                    </span>
                    <span >
                      {p.name} sent <span className="font-bold text-green-600">₹{p.amount}</span> with message {p.message && <span className="italic text-gray-500">"{p.message}"</span>}
                    </span>
                  </div>
                  <hr className='w-10 shadow-2xl h-1 rounded-full mx-auto lg:mx-30' />
                </li>
              })}
            </ul>
          </div>
          <div className="makepayments sm:w-1/2 bg-white shadow-lg rounded-2xl p-6 border border-gray-200 flex flex-col justify-between">
            <div className="font-bold text-2xl mb-4 text-gray-700">Make a Payment</div>

            <form className="flex flex-col gap-4 mb-4" >
              <div className="flex gap-4 flex-col sm:flex-row">
                <input type="number" min="1" className="w-full sm:min-w-30 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Amount (₹)" value={paymentform.amount} name='amount' onChange={handlechange} required
                />
                <input type="text" className="w-full sm:min-w-25 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Your Name" maxLength={50} value={paymentform.name} name='name' onChange={handlechange} required />
              </div>
              <input type="text" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Message (required)" maxLength={100} value={paymentform.message} name='message' onChange={handlechange} required />
              <button type="submit" onClick={(e) => {
                e.preventDefault();
                pay(Number.parseInt(paymentform.amount));
              }}
                className="disabled:focus:border-red-400 w-full disabled:bg-gray-300 bg-gray-700 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                disabled={paymentform.name.length < 1 || paymentform.message.length < 1  || paymentform.amount.length < 1} >Send</button>

              <div className='flex gap-1 md:gap-2 lg:mx-2'>
                <button onClick={() => { setPaymentform({ ...paymentform, amount: 10 }) }} className="w-1/3 bg-gray-300 text-black font-semibold py-2  rounded-lg hover:bg-gray-400 transition  cursor-pointer">Send ₹10</button>
                <button onClick={() => { setPaymentform({ ...paymentform, amount: 50 }) }} className="w-1/3 bg-gray-300 text-black font-semibold py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer">Send ₹50</button>
                <button onClick={() => { setPaymentform({ ...paymentform, amount: 100 }) }} className="w-1/3 bg-gray-300 text-black font-semibold py-2 rounded-lg hover:bg-gray-400 transition cursor-pointer" >Send ₹100</button>
              </div>
              {/* () => setPaymentform({ ...paymentform, amount: 10 }) */}

            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Paymentpage;