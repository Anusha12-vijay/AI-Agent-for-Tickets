import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateUserSuggestions(title, description) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful IT support assistant. Give simple, beginner-friendly troubleshooting steps.",
        },
        {
          role: "user",
          content: `
Ticket Title: ${title}
Ticket Description: ${description}

Give 3–5 things the user can try before waiting for support.
Use bullet points.
Do not mention AI.
`,
        },
      ],
      temperature: 0.4,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("❌ Groq AI Error:", error.message);
    throw error;
  }
}
