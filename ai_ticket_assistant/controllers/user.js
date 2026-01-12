import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import {inngest} from "../inngest/client.js"



export const signup = async (req,res) => {
    const {email,password,skills=[]} = req.body
    try{
      const hashed= await bcrypt.hash(password,10)
      const user =await User.create({email,password: hashed,skills})

      //Fire inngest event

      await inngest.send({
        name:"user/signup",
        data:{
            email
        }
      });

      const token = jwt.sign(
        {_id:user._id,role: user.role},process.env.JWT_SECRET);

      res.json({user,token})


    }catch(error){
        res.status(500).json({ error: "Signup failed",details: error.message});
        

    }

}

export const login = async(req, res) => {
  const {email,password} = req.body

  try{
    const user =await User.findOne({email})
    if(!user) return res.status(401).json({error:"User not found"})

      const isMatch = await bcrypt.compare(password,user.password);

      if(!isMatch){
        return res.status(401).json({error:"Invalid credentials"})
      }
      const token = jwt.sign(
        {_id:user._id,role: user.role},process.env.JWT_SECRET);

      res.json({user,token})

  }catch(error){
    res.status(500).json({ error: "Login failed",details: error.message});

  }

}

//this is kind of a handshake. 
export const logout =async(req,res) =>{
  try{
    const token = req.headers.authorization.split(" ")[1]
    if(!token) return res.status(401).json({error: "Unauthorised"})
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
  if(err) return res.status(401).json({error: "Unauthorised"})})
    res.json({message:"Logout successfully"})


  }catch(error){
    res.status(500).json({ error: "Logout failed",details: error.message});

  }
}

export const updateUser =async (req,res) =>{
  const { skills = [],role,email}=req.body
  try{
    if(req.user?.role !== "admin"){
      return res.status(403).json({error: "Forbidden"})
    }
    const user = await User.findOne({email})
    if(!user) return res.status(401).json({error:"User not found"});

    await User.updateOne(
      {email},
      {skills:skills.length ? skills: user.skills,role}
    )
    return res.json({message:"User updated successfully"})
  }catch(error){
    res.status(500).json({ error: "Update failed",details: error.message});

  }
};

export const getUser = async (req,res) =>{
  try{
    if(req.user.role !== "admin"){
      return res.status(403).json({error:"Forbidden"})
    }
    const user= await User.find().select("-password")
    return res.json(user)
  }catch(error){
    res.status(500).json({ error: "Fetch failed",details: error.message});

}
}
export const deleteUser = async (req, res) => {
  try {
    const userIdToDelete = req.params.id;

    // ❌ prevent deleting self
    if (req.user._id === userIdToDelete) {
      return res.status(400).json({ message: "You cannot delete yourself" });
    }

    const user = await User.findById(userIdToDelete);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❌ prevent deleting admin
    if (user.role === "admin") {
      return res.status(403).json({ message: "Cannot delete another admin" });
    }

    await User.findByIdAndDelete(userIdToDelete);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

