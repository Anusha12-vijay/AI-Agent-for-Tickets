import { inngest } from "../client.js";
import Ticket from "../../models/ticket.js";
import User from "../../models/user.js";
import { NonRetriableError } from "inngest";
import { sendMail } from "../../utils/mailer.js";
import analyzeTicket from "../../utils/agent_ai.js";
import { ruleBasedTriage } from "../../utils/ruleBasedTriage.js";
/* ---------------- RULE BASED FALLBACK ---------------- */

// function ruleBasedFallback(ticket) {
//   const text = `${ticket.title} ${ticket.description}`.toLowerCase();

//   let priority = "medium";
//   if (
//     text.includes("urgent") ||
//     text.includes("important") ||
//     text.includes("down") ||
//     text.includes("crash")
//   ) {
//     priority = "high";
//   }

//   let relatedSkills = [];
//   let assignedEmail = null;

//   if (text.includes("python")) {
//     relatedSkills.push("Python");
//     assignedEmail = "python@developer";
//   } else if (text.includes("react")) {
//     relatedSkills.push("React");
//     assignedEmail = "react@developer";
//   } else if (text.includes("microsoft") || text.includes("azure") || text.includes("m365")) {
//     relatedSkills.push("Microsoft");
//     assignedEmail = "microsoft@developer";
//   }

//   return {
//     priority,
//     relatedSkills,
//     helpfulNotes:
//       "AI analysis is pending. A developer may begin preliminary investigation while AI generates detailed resolution steps.",
//     assignedEmail,
//   };
// }

/* ---------------- INNGEST FUNCTION ---------------- */

export const onTicketCreated = inngest.createFunction(
  { id: "on-ticket-created", retries: 2 },
  { event: "ticket/created" },
  async ({ event, step }) => {
    try {
      const { ticketId } = event.data;

      // 1️⃣ Fetch ticket
      const ticket = await step.run("fetch-ticket", async () => {
        const ticketObject = await Ticket.findById(ticketId);
        if (!ticketObject) {
          throw new NonRetriableError("Ticket not found");
        }
        return ticketObject;
      });

      // 2️⃣ Mark pending
      await step.run("update-ticket-status", async () => {
        await Ticket.findByIdAndUpdate(ticket._id, { status: "PENDING" });
      });

      // 3️⃣ Try AI first
      let finalAnalysis;

try {
  const aiResponse = await analyzeTicket(ticket);

  finalAnalysis = {
    priority: aiResponse.priority,
    helpfulNotes: aiResponse.helpfulNotes,
    relatedSkills: aiResponse.relatedSkills,
    assignedTo: null,
  };

} catch (err) {
  console.warn("⚠️ Gemini failed — using rule-based triage");
  finalAnalysis = ruleBasedTriage(ticket);
}


      // 4️⃣ Update ticket with guaranteed data
      await step.run("update-ticket-with-analysis", async () => {
        await Ticket.findByIdAndUpdate(ticket._id, {
  priority: finalAnalysis.priority,
  helpfulNotes: finalAnalysis.helpfulNotes,
  relatedSkills: finalAnalysis.relatedSkills,
  assignedTo: finalAnalysis.assignedTo || null,
  status: "IN_PROGRESS",
});

      });
      

      // 5️⃣ Assign moderator
      const moderator = await step.run("assign-moderator", async () => {
        let user = await User.findOne({
          role: "moderator",
          skills: {
            $elemMatch: {
              $regex: finalAnalysis.relatedSkills.join("|"),
              $options: "i",
            },
          },
        });

        if (!user) {
          user = await User.findOne({ role: "admin" });
        }

        await Ticket.findByIdAndUpdate(ticket._id, {
          assignedTo: user?._id || null,
        });

        return user;
      });

      // 6️⃣ Notify assigned user
      await step.run("send-email-notification", async () => {
        if (moderator) {
          await sendMail(
            moderator.email,
            "Ticket Assigned",
            `A new ticket has been assigned to you: ${ticket.title}`
          );
        }
      });

      return { success: true };
    } catch (err) {
      console.error("❌ Error in on-ticket-created", err.message);
      return { success: false };
    }
  }
);
