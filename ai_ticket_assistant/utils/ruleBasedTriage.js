// const keywordRules = [
//   { key: "python", skill: "Python", email: "python@developer" },
//   { key: "react", skill: "React", email: "react@developer" },
//   { key: "microsoft", skill: "Microsoft", email: "microsoft@developer" },
//   { key: "azure", skill: "Microsoft", email: "microsoft@developer" },
//   { key: "m365", skill: "Microsoft", email: "microsoft@developer" },
// ];

// export function ruleBasedTriage(ticket) {
//   const text = `${ticket.title} ${ticket.description}`.toLowerCase();

//   let priority = "medium";
//   if (
//     text.includes("urgent") ||
//     text.includes("important") ||
//     text.includes("down") ||
//     text.includes("crash") ||
//     text.includes("production")
//   ) {
//     priority = "high";
//   }

//   const relatedSkills = [];
//   let assignedTo = null;

//   for (const rule of keywordRules) {
//     if (text.includes(rule.key)) {
//       relatedSkills.push(rule.skill);
//       if (!assignedTo) assignedTo = rule.email;
//     }
//   }

//   return {
//     summary: `Issue related to ${relatedSkills.join(", ") || "general support"}`,
//     priority,
//     helpfulNotes:
//       "AI triage failed. This ticket was processed using rule-based logic. A developer can start investigation immediately.",
//     relatedSkills,
//     assignedTo,
//   };
// }

const keywordRules = [
  { key: "python", skill: "Python" },
  { key: "react", skill: "React" },
  { key: "microsoft", skill: "Microsoft" },
  { key: "azure", skill: "Microsoft" },
  { key: "m365", skill: "Microsoft" },
];

export function ruleBasedTriage(ticket) {
  const text = `${ticket.title} ${ticket.description}`.toLowerCase();

  let priority = "medium";
  if (
    text.includes("urgent") ||
    text.includes("important") ||
    text.includes("down") ||
    text.includes("crash") ||
    text.includes("production")
  ) {
    priority = "high";
  }

  const relatedSkills = [];

  for (const rule of keywordRules) {
    if (text.includes(rule.key)) {
      relatedSkills.push(rule.skill);
    }
  }

  return {
    priority,
    helpfulNotes:
      "AI triage failed. This ticket was processed using rule-based logic. A developer can start investigation immediately.",
    relatedSkills,
  };
}

