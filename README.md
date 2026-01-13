🤖 AI-Powered Ticket Management System

A full-stack ticket management system that uses a hybrid AI + rule-based approach to automatically
categorize, prioritize, and route support tickets to the most suitable moderators.

The system is designed with security, scalability, and automation in mind, using event-driven
background processing and role-based access control.


## 🚀 Why This Project?

Traditional ticket systems:

* Rely heavily on manual triage
* Make users wait without guidance
* Overload moderators with repetitive issues

This system fixes that by combining:

* **Rule-based logic** (reliable & predictable)
* **AI reasoning (Gemini + Groq)** (flexible & contextual)
* **Event-driven background jobs** (scalable & async)

---

## ✨ Key Features

### 🧠 AI-Powered Ticket Processing

* Automatic ticket categorization
* Smart priority assignment (Low / Medium / High)
* Required skill extraction for each ticket
* AI-generated **helpful notes for moderators**
* **Instant AI suggestions shown to users** after ticket creation

### 🔄 Hybrid AI Decision Making

* Combines **rule-based logic** with **LLM reasoning**
* Not fully dependent on AI responses
* Safer, more deterministic workflow design

### 🎯 Smart Moderator Assignment

* Skill-based routing to moderators
* Automatic fallback to admin if no match found
* Reduces manual workload for admins

### ⚡ Event-Driven Architecture

* Powered by **Inngest**
* Ticket creation triggers background workflows
* Async processing without blocking user experience

### 📩 Automated Notifications

* Email notifications using **Nodemailer**
* Mailtrap used for safe testing in development

### 👥 Role-Based Access Control

* **User**: Create tickets, view status, get AI suggestions
* **Moderator**: View and resolve assigned tickets
* **Admin**: Full control (assign, delete, manage)

---

## 🛠️ Tech Stack

### Backend

* **Node.js**
* **Express.js**

### Database

* **MongoDB**

### Authentication

* **JWT (JSON Web Tokens)**

### Background Jobs

* **Inngest** (Event-driven workflows)

### AI Integration

* **Google Gemini** → Ticket analysis, priority, skills, moderator notes
* **Groq (LLaMA)** → User-facing AI suggestions at ticket creation

### Email

* **Nodemailer**
* **Mailtrap** (email testing)

---

## 🧩 System Architecture (High Level)

```
User → Create Ticket
      ↓
Immediate AI Suggestions (Groq)
      ↓
Ticket Saved
      ↓
Inngest Event Triggered
      ↓
Gemini AI Analysis
      ↓
Priority + Skills + Notes
      ↓
Moderator Assignment
      ↓
Email Notification
```

---

## 🧪 What Makes This Project Stand Out?

* ✅ **Hybrid AI** (rule-based + LLM)
* ✅ **Event-driven architecture**
* ✅ **User-first UX with instant suggestions**
* ✅ **Production-style role separation**
* ✅ **Async workflows (not blocking APIs)**

This is designed like a **real SaaS backend**, not a tutorial clone.

---

## 📸 I have also provided the video and in detail explanation of line by line code since i was also using it to prepare for my interview.
Expected issues:
Check your gemini model it is usually outdated also you can improvide on my inngest workflow code.




---

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ai-ticketing-system.git
cd ai-ticketing-system
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file:
I have given an env example file
```

### 4️⃣ Start the server

```bash
npm run dev
```

---

## 🧠 Learnings & Takeaways

* Designing **event-driven systems**
* Integrating multiple AI models responsibly
* Building **scalable async workflows**
* Applying **real-world RBAC patterns**
* Creating AI features that actually help users

---

## 📌 Future Improvements

* AI confidence scoring for suggestions
* Analytics on resolved tickets without human intervention
* Streaming AI responses
* SLA-based ticket escalation
* Frontend dashboard for AI effectiveness

---

## 🙌 Inspiration

Inspired by modern backend architecture patterns and educational content from creators like **Hitesh Choudhary**, I got inspired from his tutorial and modifies it to add some extra features like:
1. Instant Ai suggestions to users with ticket creation
2. Given delete users and ticket access to admin
3. Formed a section for the moderator to view his Tickets and Resolve it.
4. Added hybrid rule based access as well because gemini models keep getting outdated causing issue in workflow


