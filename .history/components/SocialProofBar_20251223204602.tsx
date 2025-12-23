import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export function SocialProofBar() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 rounded-2xl border bg-background/60 px-4 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur">
        <span className="font-medium text-foreground">Trusted by builders</span>
        <span className="hidden sm:inline">•</span>
        <span className="inline-flex items-center gap-1 text-foreground">
          <Star className="h-4 w-4" fill="currentColor" />
          4.9/5
        </span>
        <span className="hidden sm:inline">•</span>
        <Badge variant="secondary" className="rounded-full">1,200+ prompts refined</Badge>
        <Badge variant="secondary" className="rounded-full">No signup</Badge>
        <Badge variant="secondary" className="rounded-full">Copy-ready</Badge>
      </div>
    </div>
  );
}
