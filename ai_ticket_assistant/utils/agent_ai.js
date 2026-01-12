// import {createAgent,openai } from "@inngest/agent-kit"
// console.log("🔑 GROQ KEY PRESENT:", !!process.env.GROQ_API_KEY);


// const analyzeTicket =async (ticket) => {
//     const supportAgent = createAgent({
//   model: openai({
//     apiKey: process.env.GROQ_API_KEY,
//     baseUrl: "https://api.groq.com/openai/v1",
//     model: "llama3-8b-8192"
//   }),

//         name:"AI Ticket Triage Assitant",
//         system:`You are an expert AI assistant that processes
//         technical support tickets.
        
//         Your job is to:
//         1.Summarise the issue.
//         2.Estimate its priority
//         3.Provide helpful notes and resource links for human moderators.
//         4.List relevant technical skills required.

//         Important:
//         1. Respond with *only* valid raw JSON.
//         2. Do not include markdown,code fences,comments,or any extra formatting.
//         3. The format must be a raw JSON object.

//         Repeat: Do not wrap your output in markdown or code fences.



//         `,
//     });


//     const response = await supportAgent.run(`You are a ticket triage agent. Only return a strict JSON object with no extra text, headers, or markdown.
        
// Analyze the following support ticket and provide a JSON object with:

// - summary: A short 1-2 sentence summary of the issue.
// - priority: One of "low", "medium", or "high".
// - helpfulNotes: A detailed technical explanation that a moderator can use to solve this issue. Include useful external links or resources if possible.
// - relatedSkills: An array of relevant skills required to solve the issue (e.g., ["React", "MongoDB"]).

// Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

// {
// "summary": "Short summary of the ticket",
// "priority": "high",
// "helpfulNotes": "Here are useful tips...",
// "relatedSkills": ["React", "Node.js"]
// }

// ---

// Ticket information:

// - Title: ${ticket.title}
// - Description: ${ticket.description}`);

// // const raw = response.output[0].content
// // try{
// //     const match = raw.match(/```json\s*([\s\S]*?)\s*```/i);
// //     const jsonstring = match ? match[1] : raw.trim()
// //     return JSON.parse(jsonstring)
// // }catch(error){
// //     console.log("Failed to parse JSON from AI response" + error.message)
// //     return null

// // }
// // };

// // const raw = response.output?.[0]?.content;

// // if (!raw) return null;

// // try {
// //   return JSON.parse(raw);
// // } catch (err) {
// //   console.error("❌ AI JSON parse failed:", raw);
// //   return null;
// // }
// // };
// const raw =
//   response.output?.[0]?.content?.[0]?.text ||
//   response.output?.[0]?.content;

// if (!raw) {
//   console.error("❌ No AI output received", response.output);
//   return null;
// }

// try {
//   const firstBrace = raw.indexOf("{");
//   const lastBrace = raw.lastIndexOf("}");
//   const cleanJson = raw.slice(firstBrace, lastBrace + 1);
//   return JSON.parse(cleanJson);
// } catch (err) {
//   console.error("❌ AI JSON parse failed:", raw);
//   return null;
// }
// };



// export default analyzeTicket;

import { createAgent, gemini } from "@inngest/agent-kit";

const analyzeTicket = async (ticket) => {
  const supportAgent = createAgent({
    model: gemini({
      model: "gemini-3-flash",
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: "AI Ticket Triage Assistant",
    system: `You are an expert AI assistant that processes technical support tickets. 

Your job is to:
1. Summarize the issue.
2. Estimate its priority.
3. Provide helpful notes and resource links for human moderators.
4. List relevant technical skills required.

IMPORTANT:
- Respond with *only* valid raw JSON.
- Do NOT include markdown, code fences, comments, or any extra formatting.
- The format must be a raw JSON object.

Repeat: Do not wrap your output in markdown or code fences.`,
  });

  const response =
    await supportAgent.run(`You are a ticket triage agent. Only return a strict JSON object with no extra text, headers, or markdown.
        
Analyze the following support ticket and provide a JSON object with:

- summary: A short 1-2 sentence summary of the issue.
- priority: One of "low", "medium", or "high".
- helpfulNotes: A detailed technical explanation that a moderator can use to solve this issue. Include useful external links or resources if possible.
- relatedSkills: An array of relevant skills required to solve the issue (e.g., ["React", "MongoDB"]).

Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

{
"summary": "Short summary of the ticket",
"priority": "high",
"helpfulNotes": "Here are useful tips...",
"relatedSkills": ["React", "Node.js"]
}

---

Ticket information:

- Title: ${ticket.title}
- Description: ${ticket.description}`);

  // const raw = response.output[0].content;
  // const raw =response.output[0].content[0].text
  const raw =
  response.output?.[0]?.content?.[0]?.text;

if (!raw) {
  throw new Error("Empty AI response");
}

return JSON.parse(raw);



  try {
    const match = raw.match(/```json\s*([\s\S]*?)\s*```/i);
    const jsonString = match ? match[1] : raw.trim();
    return JSON.parse(jsonString);
  } catch (e) {
    console.log("Failed to parse JSON from AI response" + e.message);
    throw new Error("AI failed to return valid JSON");
; // watch out for this
  }
};

export default analyzeTicket;