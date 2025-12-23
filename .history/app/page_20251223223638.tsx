import HeroPromptImprover from "@/components/HeroPromptImprover";
import { ThemeToggle } from "@/components/theme-toggle";

import { SocialProofBar } from "@/components/SocialProofBar";
import { BeforeAfter } from "@/components/BeforeAfter";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyItWorks } from "@/components/WhyItWorks";
import { Testimonials } from "@/components/Testimonials";

export default function Page() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Theme toggle – fixed top-right */}
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      <HeroPromptImprover />
      <BeforeAfter />
      <HowItWorks />
      <Testimonials />

      <div className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl border bg-muted/20 p-6 text-center">
          <h3 className="text-lg font-semibold">Ready to polish another idea?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Scroll back up and try a different prompt — it takes seconds.
          </p>
          <a
            href="#top"
            className="mt-4 inline-block text-sm font-medium underline underline-offset-4"
          >
            Back to top
          </a>
        </div>
      </div>
    </main>
  );
}
