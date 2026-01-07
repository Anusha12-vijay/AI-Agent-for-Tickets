import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email:{type: String, required:true,unique:true},//add index in email
    password:{type:String,required:true},//add select: false 
    role:{type:String,default:"user",enum:["user","moderator","admin"]},
    skills:[String],
    createdAt:{type:Date,default:Date.now},
    //{ timestamps: true }

});

export default mongoose.model("User", userSchema)