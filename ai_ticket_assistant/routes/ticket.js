import express from "express"
import {authenticate} from "../middlewares/auth.js"
import { createticket, getTicket, getTickets } from "../controllers/ticket.js"
import { deleteTicket } from "../controllers/ticket.js";
import { authorizeAdmin } from "../middlewares/auth.js";

const router =express.Router()

router.get("/",authenticate,getTickets)
router.get("/:id",authenticate,getTicket)
router.post("/",authenticate,createticket);


router.delete("/:id", authenticate, authorizeAdmin, deleteTicket);


export default router