import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BeforeAfter() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">See the upgrade instantly</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A quick before/after example so you know what to expect.
          </p>
        </div>
        <Badge variant="secondary" className="rounded-full">Example</Badge>
      </div>

      <Card className="rounded-2xl border bg-background/70 p-5 shadow-xl shadow-black/5 backdrop-blur sm:p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-muted/20 p-4">
            <div className="mb-3 text-sm font-semibold text-muted-foreground">Before</div>
            <p className="text-sm leading-relaxed text-foreground/90 italic">
              “I want a website for my business… something modern with colors and stuff.”
            </p>
          </div>

          <div className="rounded-2xl border bg-muted/10 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <span>After</span>
              <Badge className="rounded-full" variant="secondary">v2</Badge>
            </div>

            <pre className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
{`Build a modern landing page for a local bakery.
Audience: Nearby customers who want a quick menu overview and easy ordering.
Goal: Increase online orders and in-store visits.

Sections:
- Hero: headline + short value prop + CTA “Order now”
- Menu Highlights: best sellers + dietary tags
- Reviews: star rating + testimonials
- Location & Hours: map + click-to-call
- FAQ: delivery, pickup, custom cakes
- Contact + Footer

Style: clean, warm, minimal with rounded cards and subtle shadows.
CTA: Primary “Order now”, Secondary “View menu”.`}
            </pre>
          </div>
        </div>
      </Card>
    </section>
  );
}
