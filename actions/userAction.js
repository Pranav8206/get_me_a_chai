"use server";

import Razorpay from "razorpay";
import connectDB from "@/db/connectDB";
import User from "@/models/User";
import Payments from "@/models/Payments";

export const initialize = async (amount, to_username, paymentForm) => {
    try {

    console.log("🔧 Connecting to database...");
    await connectDB();

    let user = await User.findOne({username: to_username});
    const secret = user.RazorpaySecret

    const instance = new Razorpay({
      key_id: user.RazorpayId,
      key_secret: secret,
    });

    const options = {
      amount: Number.parseInt(amount) * 100, // Razorpay uses paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        to_user: to_username,
        name: paymentForm.name,
        message: paymentForm.message || "",
      },
    };

    console.log("📦 Creating Razorpay order with options:", options);
    const order = await instance.orders.create(options);
    console.log("✅ Order created:", order);

    console.log("📝 Saving payment to DB...");
    await Payments.create({
      name: paymentForm.name,
      to_user: to_username,
      amount: amount,
      message: paymentForm.message,
      orderId: order.id,
    });
    console.log("✅ Payment saved to DB.");

    return order;
    }
    catch (error) {
        console.error("Razorpay order creation failed:", error);
        throw new Error("Failed to initialize payment.");
    }
}

export const fetchuser = async (username) => {
  await connectDB()
  let u = await User.findOne({username: username})
  let user = u.toObject({flattenObjectIds: true})
  return user
}

export const fetchpayments = async (username) => {
  await connectDB()
  let p = await Payments.find({to_user: username, done: true}).sort({amount: -1}).lean()
  return p;
}

export const updateProfile = async (data, oldusername) => {
  await connectDB();
  let ndata = Object.fromEntries(data)

  if (oldusername !== ndata.username){
    let  u = await User.findOne({username: ndata.username})
    if (u){
      return {error: "Username already exists"}
    }
    await User.updateOne({email: ndata.email}, ndata)
    //Now update all the username in the Payments table
    await Payments.updateMany({ to_user: oldusername },{ $set: { to_user: ndata.username } }
    );
  }
  else{
    await User.updateOne({email: ndata.email}, ndata)
  }
  



}