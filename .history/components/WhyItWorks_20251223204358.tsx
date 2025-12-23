import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, DollarSign, LayoutPanelTop, Target, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: LayoutPanelTop,
    title: "Developer-friendly structure",
    desc: "Sections, CTAs, and requirements laid out in a format builders understand.",
  },
  {
    icon: Target,
    title: "Clear goals & audience",
    desc: "We turn “make it modern” into measurable intent and target outcomes.",
  },
  {
    icon: ShieldCheck,
    title: "Better defaults",
    desc: "Includes missing essentials like trust signals, FAQs, and conversion flow.",
  },
  {
    icon: Zap,
    title: "Higher quality output",
    desc: "Less guessing = fewer weird designs and fewer follow-up questions.",
  },
  {
    icon: Clock,
    title: "Saves time",
    desc: "Reduce back-and-forth and start building sooner.",
  },
  {
    icon: DollarSign,
    title: "Avoid costly rework",
    desc: "Clear specs prevent revisions and misalignment.",
  },
] as const;

export function WhyItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="mb-8 flex flex-col items-center text-center">
        <Badge variant="secondary" className="rounded-full">Product Thinking</Badge>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Why our prompt refiner works
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          It doesn’t just rewrite — it adds the structure and decisions that make a prompt usable.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Card
            key={f.title}
            className="rounded-2xl border bg-background/70 p-5 shadow-xl shadow-black/5 backdrop-blur transition hover:shadow-2xl hover:shadow-black/10"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-2xl border bg-muted/15 p-3">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
