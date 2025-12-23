import HeroPromptImprover from "@/components/HeroPromptImprover";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Page() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="fixed right-4 top-4 z-50">
        <ThemeToggle />
      </div>

      <HeroPromptImprover />
    </main>
  );
}
