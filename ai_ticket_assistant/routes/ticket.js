
import express from "express";
import Ticket from "../models/ticket.js";

import { authenticate, authorizeModerator, authorizeAdmin } from "../middlewares/auth.js";
import {
  createticket,
  getTicket,
  getTickets,
  deleteTicket,
} from "../controllers/ticket.js";
import { updateTicketStatus } from "../controllers/ticket.js";


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
 * 🔹 UPDATE ticket status (moderator/admin)
 */
router.patch(
  "/:id/status",
  authenticate,
  authorizeModerator,
  updateTicketStatus
);

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
