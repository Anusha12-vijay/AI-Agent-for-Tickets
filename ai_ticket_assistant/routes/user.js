import {login,signup,logout, updateUser, getUser} from "../controllers/user.js"
import express from "express"
import {authenticate} from "../middlewares/auth.js"
import { deleteUser } from "../controllers/user.js";
import { authorizeAdmin } from "../middlewares/auth.js";



const router =express.Router()
router.post("/update-user",authenticate,updateUser);
router.get("/users",authenticate,getUser);
// 🔴 DELETE USER (ADMIN ONLY)
router.delete("/users/:id", authenticate, authorizeAdmin, deleteUser);
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)


export default router