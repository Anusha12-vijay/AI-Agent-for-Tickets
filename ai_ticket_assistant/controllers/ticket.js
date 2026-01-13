import { inngest } from "../inngest/client.js"
import Ticket from "../models/ticket.js"


export const createticket = async(req,res)=>{
    try{
        const {title , description} =req.body
        if(!title || !description){
            return res.status(400).json({message: "Title and description are required"})
        }
        const newTicket = await Ticket.create({
            title,
            description,
            createdBy:req.user._id.toString()

        })
        // await inngest.send({
        //     name:"ticket/created",
        //     data:{
        //         ticketId:(await newTicket)._id.toString(),
        //         title,
        //         description,
        //         createdBy: req.user._id.toString()
        //     }
        // });
        try {
  await inngest.send({
    name: "ticket/created",
    data: {
      ticketId: newTicket._id.toString(),
      title,
      description,
      createdBy: req.user._id.toString(),
    },
  });
} catch (err) {
  console.error("⚠️ Inngest failed, ticket still created:", err.message);
}

        // return res.status(201).json({
        //     message:"Ticket created and processing started",
        //     ticket:newTicket
        // })
        return res.status(201).json({
  message: "Ticket created",
  ticket: newTicket,
});




    }catch(error){
        console.error("❌Error creating Ticket",error.message)
        return res.status(500).json({message:"Internal server error"})

    }
}

export const getTickets =async (req,res) =>{
    try{
        const user =req.user
        let tickets=[]
        if(user.role!=="user"){
            tickets=await Ticket.find({}).populate("assignedTo",["email", "_id"])
            .sort({createdAt:-1})
        }else{
            tickets = await Ticket.find({createdBy: user._id})
                .select("title description status createdAt")
                .sort({createdAt:-1})
        }
        return res.status(200).json(tickets)
    }catch(error){
        console.error("❌Error fetching Tickets",error.message)
        return res.status(500).json({message:"Internal server error"})

    }
}


export const getTicket =async(req,res)=>{
    try{
        const user=req.user
        let ticket;

        if(user.role!=="user"){
            ticket = await Ticket.findById(req.params.id)
            .populate("assignedTo",["email","_id"])

        }else{
            ticket =await Ticket.findOne({
                createdBy:user._id,
                _id:req.params.id
            }).select("title description status createdAt")
        }

        if(!ticket){
            return res.status(400).json({message:"Ticket not found"})
        }

        return res.status(200).json({ticket})
    }catch(error){
        console.error("❌Error fetching Tickt",error.message)
        return res.status(500).json({message:"Internal server error"})

    }
}
export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    await Ticket.findByIdAndDelete(id);

    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete ticket" });
  }
};

export const getAssignedTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      assignedTo: req.user._id,
    })
      .populate("assignedTo", ["email"])
      .sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

