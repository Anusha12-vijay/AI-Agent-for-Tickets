// import jwt from "jsonwebtoken"

// export const authenticate =(req,res,next)=>{
//     const token = req.headers.authorization?.split(" ")[1]

//     if(!token){
//         return res.status(401).json({error: "Access Denied. No token found."})

//     }
//     try{
//         const decoded = jwt.verify(token,process.env.JWT_SECRET);
//         req.user=decoded;
//         next();

//     }catch(error){
//         res.status(401).json({error:"Invalid token"})
//     }
// }

// import jwt from "jsonwebtoken";
// import User from "../models/user.js";

// export const authenticate = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "Access denied. No token provided." });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded._id).select("_id email role");

//     if (!user) {
//       return res.status(401).json({ error: "User no longer exists" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Invalid or expired token" });
//   }
// };

// export const authorizeAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Admin access required" });
//   }
//   next();
// };

// export const authorizeModerator = (req, res, next) => {
//   if (req.user.role !== "moderator") {
//     return res.status(403).json({ message: "Moderator access required" });
//   }
//   next();
// };

// middlewares/auth.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("_id email role");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

export const authorizeModerator = (req, res, next) => {
  if (req.user.role !== "moderator") {
    return res.status(403).json({ message: "Moderator only" });
  }
  next();
};

