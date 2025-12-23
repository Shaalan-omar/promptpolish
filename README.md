# Running the project
# 1. Clone the repository
git clone https://github.com/Shaalan-omar/promptpolish.git

# 2. Navigate into the project
cd promptpolish

# 3. Install dependencies
npm install 
(You have to have node installed on your PC)

# 4. Start the development server
npm run dev

# 5.Open your browser and go to:
http://localhost:3000


# PromptPolish — Turn Rough Ideas into Website-Ready Prompts

PromptPolish is a small, end-to-end product feature that helps users transform vague website ideas into clear, structured prompts they can directly use with website builders or AI tools.

This project was built as part of the **Full-Stack Vibe Coder (Stunning)** candidate task.

---

## ✨ What this does

**Flow**
1. User writes a rough website idea in plain language
2. User submits the idea
3. The system returns an improved, structured, builder-ready prompt



---

## 🧠 Product & Design Approach

- Focused on **clarity, trust, and conversion**
- Treated the hero section as the main product moment
- Added supporting sections (Before/After, How it works, Testimonials) to make the page feel alive and credible
- Kept the scope intentionally tight to avoid over-engineering

---

## 🛠 Tech Stack

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (v4)
- shadcn/ui
- lucide-react icons

**Backend**
- Next.js Route Handler (`/api/improve`)
- Deterministic prompt-improvement logic (rule-based)

**Other**
- Dark / Light mode with `next-themes`
- Smooth scrolling and subtle UI motion

---

## 🔌 Backend Notes

The `/api/improve` endpoint accepts a rough idea and returns a refined prompt.

POST /api/improve
Content-Type: application/json

{
  "idea": "I want a website for my gym with pricing and classes",
  "tone": "Professional"
}
