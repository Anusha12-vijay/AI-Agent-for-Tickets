import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema({
    title:String,
    description:String,
    status:{type: String,default:"Pending"},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null

    },
    priority: String,
    deadline:Date,
    helpfulnotes:String,
    suggestions:String,
    relatedSkills:[String],
    createdAt:{type:Date,default:Date.now},
});

export default mongoose.model("Ticket", ticketSchema)