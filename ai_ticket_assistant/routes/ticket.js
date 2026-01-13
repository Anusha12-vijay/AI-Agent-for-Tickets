// import express from "express"
// import {authenticate, authorizeModerator} from "../middlewares/auth.js"
// import { createticket, getTicket, getTickets } from "../controllers/ticket.js"
// import { deleteTicket } from "../controllers/ticket.js";
// import { authorizeAdmin } from "../middlewares/auth.js";
// // import { getAssignedTickets } from "../controllers/ticket.js";





// const router =express.Router()

// /* 🔥 PLACE THIS FIRST */
// router.get(
//   "/my",
//   authenticate,
//   authorizeModerator,
//   async (req, res) => {
//     const tickets = await Ticket.find({
//       assignedTo: req.user.email,
//     }).sort({ createdAt: -1 });

//     res.json(tickets);
//   }
// );

// router.get("/",authenticate,getTickets)
// router.get("/:id",authenticate,getTicket)
// router.post("/",authenticate,createticket);



// router.delete("/:id", authenticate, authorizeAdmin, deleteTicket);


// export default router

import express from "express";
import Ticket from "../models/ticket.js";

import { authenticate, authorizeModerator, authorizeAdmin } from "../middlewares/auth.js";
import {
  createticket,
  getTicket,
  getTickets,
  deleteTicket,
} from "../controllers/ticket.js";

const router = express.Router();

/**
 * 🔹 MODERATOR: get tickets assigned to logged-in moderator
 * GET /api/tickets/my
 */
router.get(
  "/my",
  authenticate,
  authorizeModerator,
  async (req, res) => {
    try {
      const tickets = await Ticket.find({
        assignedTo: req.user._id, // ✅ FIXED
      })
        .populate("assignedTo", ["email", "_id"])
        .sort({ createdAt: -1 });

      res.status(200).json(tickets);
    } catch (error) {
      console.error("❌ Error fetching moderator tickets:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

/**
 * 🔹 GET all tickets
 * - admin/moderator: all tickets
 * - user: only their tickets
 */
router.get("/", authenticate, getTickets);

/**
 * 🔹 GET single ticket by ID
 */
router.get("/:id", authenticate, getTicket);

/**
 * 🔹 CREATE ticket (user)
 */
router.post("/", authenticate, createticket);

/**
 * 🔹 DELETE ticket (admin only)
 */
router.delete("/:id", authenticate, authorizeAdmin, deleteTicket);

export default router;
