import express from "express"
import {authenticate} from "../middlewares/auth.js"
import { createticket, getTicket, getTickets } from "../controllers/ticket.js"


const router =express.Router()

router.get("/",authenticate,getTickets)
router.get("/:id",authenticate,getTicket)
router.post("/",authenticate,createticket);

export default router