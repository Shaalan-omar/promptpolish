import { NextResponse } from "next/server";

type Tone = "Professional" | "Friendly" | "Bold";

type ImproveRequest = {
  idea: string;
  tone?: Tone;
};

type ImproveResponse = {
  improved: string;
  title?: string;
  bullets?: string[];
  tone?: string;
};

const MAX_CHARS = 500;

function clampSentence(input: string) {
  const s = input.trim().replace(/\s+/g, " ");
  return s.length ? s : "";
}

function inferWebsiteType(idea: string) {
  const lower = idea.toLowerCase();
  if (lower.includes("portfolio") || lower.includes("case studies")) return "portfolio site";
  if (lower.includes("gym") || lower.includes("fitness")) return "gym website";
  if (lower.includes("coffee") || lower.includes("cafe")) return "coffee shop site";
  if (lower.includes("landing")) return "landing page";
  if (lower.includes("ecommerce") || lower.includes("shop") || lower.includes("online ordering"))
    return "commerce site";
  return "marketing site";
}

function inferAudience(idea: string) {
  const lower = idea.toLowerCase();
  if (lower.includes("gym") || lower.includes("fitness"))
    return "Local residents looking for training programs, memberships, and class schedules";
  if (lower.includes("ui designer") || lower.includes("portfolio"))
    return "Recruiters, hiring managers, and potential clients evaluating design work";
  if (lower.includes("coffee") || lower.includes("cafe"))
    return "Nearby customers who want menu info, ordering, and store details";
  return "People searching for a clear overview and a simple next step";
}

function inferCTA(idea: string) {
  const lower = idea.toLowerCase();
  if (lower.includes("schedule")) return "Book a class";
  if (lower.includes("pricing")) return "See membership plans";
  if (lower.includes("portfolio")) return "View case studies";
  if (lower.includes("ordering") || lower.includes("order")) return "Order online";
  return "Get started";
}

function toneStyle(tone: Tone) {
  switch (tone) {
    case "Friendly":
      return { voice: "Warm, friendly, and encouraging", style: "Bright, approachable, human" };
    case "Bold":
      return { voice: "Bold, confident, punchy", style: "High-contrast, strong headlines, energetic" };
    case "Professional":
    default:
      return { voice: "Clear, professional, and trustworthy", style: "Clean, minimal, modern" };
  }
}

function buildImproved(idea: string, tone: Tone): ImproveResponse {
  const cleanIdea = clampSentence(idea);
  const siteType = inferWebsiteType(cleanIdea);
  const audience = inferAudience(cleanIdea);
  const cta = inferCTA(cleanIdea);
  const { voice, style } = toneStyle(tone);

  const title =
    siteType === "portfolio site"
      ? "Design Portfolio with Case Studies"
      : siteType === "gym website"
        ? "Gym Website for Memberships & Schedule"
        : siteType === "coffee shop site"
          ? "Coffee Shop Landing Page with Online Ordering"
          : "Modern Website Prompt";

  const bullets =
    siteType === "portfolio site"
      ? ["Case study layout that highlights outcomes", "Clear CTA for contact / hiring", "Fast, responsive, accessible UI"]
      : siteType === "gym website"
        ? ["Membership pricing + plan comparison", "Weekly class schedule + booking CTA", "Trust signals: testimonials, trainers, results"]
        : siteType === "coffee shop site"
          ? ["Menu + featured items + ordering flow", "Location, hours, delivery/pickup info", "Newsletter + social links for retention"]
          : ["Clear positioning and primary CTA", "Structured sections and scannable content", "Responsive, modern visual system"];

  const sections =
    siteType === "portfolio site"
      ? [
          "Hero (name, role, 1-line value proposition, CTA)",
          "Selected Work (case study cards with tags)",
          "Case Study Template (problem → process → solution → impact)",
          "About (bio, tools, strengths)",
          "Testimonials / Clients",
          "Contact (form + email) + footer",
        ]
      : siteType === "gym website"
        ? [
            "Hero (headline, supporting line, CTA)",
            "Programs / Classes (cards, levels, durations)",
            "Schedule (weekly grid) + 'Book a class'",
            "Pricing (tiers) + FAQs",
            "Trainers (profiles) + testimonials",
            "Location / Hours + Contact",
          ]
        : siteType === "coffee shop site"
          ? [
              "Hero (headline, photo, primary CTA)",
              "Menu Highlights (popular items)",
              "Order Online (pickup/delivery) + ordering CTA",
              "About / Story",
              "Location, Hours, Map",
              "Reviews + Newsletter + Footer",
            ]
          : [
              "Hero (headline, supporting line, CTA)",
              "Features / Benefits",
              "How it works",
              "Pricing (if relevant)",
              "FAQs",
              "Contact / CTA section + footer",
            ];

  const features =
    siteType === "portfolio site"
      ? ["Project filtering by category", "Case study pages with rich media", "Contact form + calendar link (optional)"]
      : siteType === "gym website"
        ? ["Class schedule view (mobile-friendly)", "Pricing table with highlights", "Lead capture: free trial / consultation"]
        : siteType === "coffee shop site"
          ? ["Order button + embedded ordering link", "Menu categories + dietary tags", "Google Maps embed + click-to-call"]
          : ["Clear CTA, responsive layout, SEO-friendly headings", "Accessible components", "Simple analytics-ready structure"];

  const improved = [
    `Build a ${style} ${siteType} based on the following idea:`,
    `"${cleanIdea}"`,
    ``,
    `Goal: Convert visitors into action (${cta}) while clearly explaining what this site offers.`,
    `Audience: ${audience}.`,
    ``,
    `Pages / Sections (in order):`,
    ...sections.map((s) => `- ${s}`),
    ``,
    `Content requirements:`,
    `- Use concise, skimmable copy with clear hierarchy (H1 → supporting text → CTA).`,
    `- Add trust signals where appropriate (testimonials, ratings, logos, before/after, social proof).`,
    `- Include a final CTA section near the bottom that mirrors the hero CTA.`,
    ``,
    `Key features:`,
    ...features.map((f) => `- ${f}`),
    ``,
    `Design & tone:`,
    `- Voice: ${voice}.`,
    `- Visuals: ${style} with generous whitespace, rounded cards, and subtle shadows.`,
    `- Buttons: primary CTA "${cta}" (high contrast), secondary CTA "Learn more".`,
    ``,
    `CTA behavior:`,
    `- Primary CTA anchors to the most relevant conversion section (Pricing / Order / Contact).`,
    `- Keep the CTA visible and repeated 2–3 times throughout the page.`,
  ].join("\n");

  return { improved, title, bullets, tone };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ImproveRequest;

    const idea = clampSentence(body.idea ?? "").slice(0, MAX_CHARS);
    const tone = (body.tone ?? "Professional") as Tone;

    if (!idea) {
      return NextResponse.json({ error: "Idea is required." }, { status: 400 });
    }

    // simulate latency like a real product
    await new Promise((r) => setTimeout(r, 700));

    // optionally: tiny failure rate for demo robustness
    // if (Math.random() < 0.02) return NextResponse.json({ error: "Temporary error." }, { status: 500 });

    const result = buildImproved(idea, tone);
    return NextResponse.json(result satisfies ImproveResponse);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
