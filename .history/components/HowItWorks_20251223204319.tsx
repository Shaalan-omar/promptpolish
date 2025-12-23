import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wand2, Copy } from "lucide-react";

const steps = [
  {
    icon: Sparkles,
    title: "Describe your idea",
    desc: "Write it in plain words — no technical jargon needed.",
  },
  {
    icon: Wand2,
    title: "We refine it",
    desc: "We structure it into goals, audience, pages, and CTA.",
  },
  {
    icon: Copy,
    title: "Copy & build",
    desc: "Paste it into your website builder and move faster.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">How PromptPolish Works</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Three simple steps to transform a vague idea into a builder-ready prompt.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((s, idx) => (
          <Card
            key={s.title}
            className="rounded-2xl border bg-background/70 p-5 shadow-xl shadow-black/5 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/10"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="rounded-2xl border bg-muted/15 p-3">
                <s.icon className="h-5 w-5" />
              </div>
              <Badge variant="secondary" className="rounded-full">Step {idx + 1}</Badge>
            </div>

            <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
