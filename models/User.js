import mongoose from "mongoose";
const {Schema, model} = mongoose;

const UserSchema = new mongoose.Schema({
    email: {type:String, required:true},
    name: {type:String, required:true},
    username: {type: String},
    profilePic: {type: String},
    coverPic: {type: String},
    RazorpayId: {type: String},
    RazorpaySecret: {type: String},
    createdAt: {type: Date, default:Date.now},
    updatedAt: {type: Date, default: Date.now},
});
//model or models

export default mongoose.models.User || model("User", UserSchema);
