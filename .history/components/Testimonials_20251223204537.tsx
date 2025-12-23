import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small business owner",
    quote:
      "I couldn’t explain what I wanted for my bakery site. The refined prompt got me the exact layout on the first try.",
    rating: 5,
  },
  {
    name: "Ahmed M.",
    role: "Freelance developer",
    quote:
      "Clients send messy briefs. This turns them into a clean spec with sections, CTAs, and content rules. Massive time saver.",
    rating: 5,
  },
  {
    name: "Lina K.",
    role: "UI designer",
    quote:
      "The tone selector is perfect. I can generate a bold version for landing pages and a professional one for clients.",
    rating: 5,
  },
] as const;

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4" fill={i < n ? "currentColor" : "none"} />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">What users say</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Social proof makes it feel real. Keep it short and punchy.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <Card
            key={t.name}
            className="rounded-2xl border bg-background/70 p-5 shadow-xl shadow-black/5 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
              <Badge className="rounded-full" variant="secondary">{t.rating.toFixed(1)}</Badge>
            </div>

            <div className="mt-3 text-foreground/90">
              <Stars n={t.rating} />
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">“{t.quote}”</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
