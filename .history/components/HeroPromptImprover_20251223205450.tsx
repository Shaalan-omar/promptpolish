// components/HeroPromptImprover.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Wand2,
  Copy,
  Check,
  Loader2,
  RotateCcw,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Tone = "Professional" | "Friendly" | "Bold";

type ImproveResponse = {
  improved: string;
  title?: string;
  bullets?: string[];
  tone?: string;
};

const MAX_CHARS = 500;

const EXAMPLES = [
  "I want a website for my gym, with pricing and schedule",
  "Portfolio for a UI designer with case studies",
  "Landing page for a coffee shop with online ordering",
] as const;

function clampSentence(input: string) {
  const s = input.trim().replace(/\s+/g, " ");
  return s.length ? s : "";
}

function inferWebsiteType(idea: string) {
  const lower = idea.toLowerCase();
  if (lower.includes("portfolio") || lower.includes("case studies"))
    return "portfolio site";
  if (lower.includes("gym") || lower.includes("fitness"))
    return "gym website";
  if (lower.includes("coffee") || lower.includes("cafe"))
    return "coffee shop site";
  if (lower.includes("landing"))
    return "landing page";
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
      return {
        voice: "Warm, friendly, and encouraging",
        style: "Bright, approachable, human",
      };
    case "Bold":
      return {
        voice: "Bold, confident, punchy",
        style: "High-contrast, strong headlines, energetic",
      };
    case "Professional":
    default:
      return {
        voice: "Clear, professional, and trustworthy",
        style: "Clean, minimal, modern",
      };
  }
}

/**
 * API stub: POST /api/improve
 * Request: { idea: string }
 * Response: { improved: string, title?: string, bullets?: string[], tone?: string }
 *
 * For now: mock delay (700ms) and generate a realistic “builder-ready” prompt.
 */
async function mockImprovePrompt(params: { idea: string; tone: Tone }): Promise<ImproveResponse> {
  const { idea, tone } = params;

  // Simulate network + processing delay
  await new Promise((r) => setTimeout(r, 700));

  // Randomly fail very rarely to validate error handling (2%)
  if (Math.random() < 0.02) {
    throw new Error("Mock API hiccup");
  }

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

  return {
    improved,
    title,
    bullets,
    tone,
  };
}

function SkeletonOutput() {
  return (
    <div className="space-y-3" aria-hidden="true">
      <div className="h-4 w-40 rounded-md bg-muted/70 animate-pulse" />
      <div className="h-3 w-full rounded-md bg-muted/60 animate-pulse" />
      <div className="h-3 w-11/12 rounded-md bg-muted/60 animate-pulse" />
      <div className="h-3 w-10/12 rounded-md bg-muted/60 animate-pulse" />
      <div className="h-3 w-9/12 rounded-md bg-muted/60 animate-pulse" />
      <div className="h-3 w-11/12 rounded-md bg-muted/60 animate-pulse" />
      <div className="h-3 w-8/12 rounded-md bg-muted/60 animate-pulse" />
    </div>
  );
}

function HeroHeader() {
  return (
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur">
        <ShieldCheck className="h-4 w-4" />
        <span>Private by default — your text stays in this session</span>
      </div>

      <div className="space-y-3">
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Turn a messy idea into a <span className="text-foreground">website-ready prompt.</span>
        </h1>
        <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Describe what you want in plain words — we’ll rewrite it into a clear spec you can build with.
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl border bg-background/70 p-2 shadow-sm">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="font-medium">Clarifies goals, audience, and pages</p>
            <p className="text-sm text-muted-foreground">So your builder doesn’t guess what you meant.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl border bg-background/70 p-2 shadow-sm">
            <Wand2 className="h-4 w-4" />
          </div>
          <div>
            <p className="font-medium">Adds structure and missing details</p>
            <p className="text-sm text-muted-foreground">Sections, CTAs, and essential content requirements.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl border bg-background/70 p-2 shadow-sm">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <p className="font-medium">Ready to copy into your website builder</p>
            <p className="text-sm text-muted-foreground">Clean format that’s easy for tools to follow.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OutputPanel(props: {
  loading: boolean;
  error: string | null;
  result: ImproveResponse | null;
  onCopy: () => void;
  copied: boolean;
}) {
  const { loading, error, result, onCopy, copied } = props;

  return (
    <div className="rounded-2xl border bg-background p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">Improved Prompt</h3>
          <Badge variant="secondary" className="rounded-full">
            v2
          </Badge>
          {result?.tone ? (
            <Badge variant="outline" className="rounded-full">
              {result.tone}
            </Badge>
          ) : null}
        </div>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onCopy}
          disabled={!result?.improved || loading}
          aria-label="Copy improved prompt"
          className="gap-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>

      <Separator className="my-3" />

      {loading ? (
        <SkeletonOutput />
      ) : error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm">
          <p className="font-medium text-destructive">Something went wrong.</p>
          <p className="text-muted-foreground">Please try again — this can happen occasionally.</p>
        </div>
      ) : result?.improved ? (
        <div className="space-y-3">
          {(result.title || (result.bullets && result.bullets.length > 0)) && (
            <div className="space-y-2">
              {result.title ? (
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full" variant="outline">
                    Suggested title
                  </Badge>
                  <span className="text-sm font-medium">{result.title}</span>
                </div>
              ) : null}

              {result.bullets?.length ? (
                <div className="flex flex-wrap gap-2">
                  {result.bullets.slice(0, 4).map((b, idx) => (
                    <Badge key={`${b}-${idx}`} variant="secondary" className="rounded-full">
                      {b}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          )}

          <pre className="max-h-[340px] overflow-auto whitespace-pre-wrap rounded-xl bg-muted/40 p-3 text-sm leading-relaxed text-foreground">
            {result.improved}
          </pre>
        </div>
      ) : (
        <div className="rounded-xl border bg-muted/20 p-4">
          <p className="text-sm text-muted-foreground">
            Your improved prompt will show up here. Start with a rough idea — short is fine.
          </p>
        </div>
      )}
    </div>
  );
}

function PromptCard() {
  const [idea, setIdea] = React.useState("");
  const [tone, setTone] = React.useState<Tone>("Professional");

  const [touched, setTouched] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [result, setResult] = React.useState<ImproveResponse | null>(null);
  const [copied, setCopied] = React.useState(false);

  const chars = idea.length;
  const remaining = MAX_CHARS - chars;
  const isEmpty = clampSentence(idea).length === 0;

  const fillExample = React.useCallback(() => {
    const next = EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)];
    setIdea(next);
    setTouched(false);
    setError(null);
  }, []);

  const doCopy = React.useCallback(async () => {
    if (!result?.improved) return;
    try {
      await navigator.clipboard.writeText(result.improved);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // If clipboard fails, keep UI calm—no crash.
      setCopied(false);
    }
  }, [result?.improved]);

  const onSubmit = React.useCallback(async () => {
    setTouched(true);
    setError(null);

    if (isEmpty) return;

    setLoading(true);
    setResult(null);

    try {
        const res = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, tone }),
        });

        if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? "Request failed");
        }

        const data = (await res.json()) as ImproveResponse;
        setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [idea, tone, isEmpty]);
    //   // In production, this would be:
    //   // const res = await fetch("/api/improve", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ idea, tone }) })
    //   // const data = (await res.json()) as ImproveResponse;
    //   const data = await mockImprovePrompt({ idea, tone });
    //   setResult(data);


  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Cmd/Ctrl + Enter to submit
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        void onSubmit();
      }
    },
    [onSubmit]
  );

  return (
    <Card className="rounded-2xl border bg-background/70 p-4 shadow-xl shadow-black/5 backdrop-blur sm:p-5">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">Prompt Improver</h2>
            <p className="text-sm text-muted-foreground">
              Paste a rough idea — get a clearer, structured prompt back.
            </p>
          </div>

          <div className="min-w-[160px]">
            <label className="sr-only" htmlFor="tone">
              Tone
            </label>
            <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
              <SelectTrigger id="tone" className="h-9 rounded-xl">
                <SelectValue placeholder="Tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Friendly">Friendly</SelectItem>
                <SelectItem value="Bold">Bold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="idea" className="text-sm font-medium">
              Your idea
            </label>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <button
                type="button"
                onClick={fillExample}
                className="underline-offset-4 hover:underline"
              >
                Try an example
              </button>
              <span aria-live="polite" className="tabular-nums">
                {chars}/{MAX_CHARS}
              </span>
            </div>
          </div>

          <Textarea
            id="idea"
            value={idea}
            onChange={(e) => {
              setIdea(e.target.value.slice(0, MAX_CHARS));
              setError(null);
            }}
            onBlur={() => setTouched(true)}
            onKeyDown={onKeyDown}
            maxLength={MAX_CHARS}
            placeholder={`e.g. "${EXAMPLES[0]}"`}
            className="min-h-[120px] resize-none rounded-2xl bg-background"
            aria-invalid={touched && isEmpty ? "true" : "false"}
            aria-describedby="idea-help idea-validation"
          />

          <div className="flex items-center justify-between gap-3">
            <p id="idea-help" className="text-xs text-muted-foreground">
              Tip: Press <kbd className="rounded border bg-muted px-1">Ctrl</kbd>/
              <kbd className="rounded border bg-muted px-1">⌘</kbd> +{" "}
              <kbd className="rounded border bg-muted px-1">Enter</kbd> to improve.
            </p>
            <p className="text-xs text-muted-foreground tabular-nums" aria-live="polite">
              {remaining} left
            </p>
          </div>

          <div id="idea-validation" className="min-h-[18px]">
            {touched && isEmpty ? (
              <p className="text-xs text-destructive">Write a quick idea first — even one sentence.</p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            onClick={() => void onSubmit()}
            disabled={loading || isEmpty}
            className="h-11 rounded-2xl text-sm font-semibold shadow-sm"
            aria-busy={loading ? "true" : "false"}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Improving…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Improve my prompt
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground">
            No signup needed. Results in seconds.
          </p>
        </div>

        {(error || result?.improved) && (
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-muted-foreground">
              {error ? "We couldn’t generate a prompt this time." : "Looks good — copy and paste into your builder."}
            </div>

            {error ? (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => void onSubmit()}
                disabled={loading || isEmpty}
                className="rounded-xl"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Try again
              </Button>
            ) : null}
          </div>
        )}

        <OutputPanel
          loading={loading}
          error={error}
          result={result}
          onCopy={doCopy}
          copied={copied}
        />
      </div>
    </Card>
  );
}

export default function HeroPromptImprover() {
  return (
    <section className="relative overflow-hidden" id="top">
      {/* Subtle background: gradient + grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-background" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(circle at 20% 10%, black 0%, transparent 55%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Mobile UX: card first is more “do it now”, then explain. */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <PromptCard />
          </motion.div>

          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
          >
            <HeroHeader />
          </motion.div>
        </div>

        <div className="mt-10 space-y-4">
        <div className="flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border bg-background/60 px-4 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur">
            <span className="font-medium text-foreground">Plays nicely with:</span>
            <Badge variant="secondary" className="rounded-full">Framer</Badge>
            <Badge variant="secondary" className="rounded-full">Webflow</Badge>
            <Badge variant="secondary" className="rounded-full">Lovable</Badge>
            <Badge variant="secondary" className="rounded-full">Any AI builder</Badge>
            </div>
        </div>

        {/* subtle "there's more" hint */}
        <div className="flex items-center justify-center">
            <a
            href="#how-it-works"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted-foreground transition hover:text-foreground"
            aria-label="Scroll to learn more"
            >
            <span>Scroll to see how it works</span>
            <span className="inline-block transition group-hover:translate-y-0.5">↓</span>
            </a>
        </div>
        </div>

      </div>
    </section>
  );
}
