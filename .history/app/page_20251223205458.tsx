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
      {/* Top-right theme toggle */}
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </div>

      <HeroPromptImprover />
      <SocialProofBar />
      <BeforeAfter />
      <WhyItWorks />
      <HowItWorks />
      <Testimonials />

      {/* Simple footer */}
      <footer className="mx-auto max-w-6xl px-4 pb-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} PromptPolish — Built for a “real product” feel.
      </footer>
    </main>
  );
}

// import HeroPromptImprover from "@/components/HeroPromptImprover";
// import { ThemeToggle } from "@/components/theme-toggle";

// export default function Page() {
//   return (
//     <main className="min-h-dvh bg-background text-foreground">
//       <div className="fixed right-4 top-4 z-50">
//         <ThemeToggle />
//       </div>

//       <HeroPromptImprover />
//     </main>
//   );
// }
