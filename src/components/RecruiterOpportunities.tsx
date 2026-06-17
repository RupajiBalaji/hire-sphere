import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function RecruiterOpportunities() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Job Opportunities</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Matching your verified skills
          </p>
        </div>
        <Link
          to="/app/jobs"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Ghost outlines — real jobs appear once recruiters post them */}
      <div className="mt-4 space-y-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-dashed border-border bg-card p-4"
            style={{ opacity: 1 - (i - 1) * 0.25 }}
          >
            <div className="flex items-start gap-3">
              {/* company logo placeholder */}
              <div className="h-10 w-10 shrink-0 rounded-2xl border border-dashed border-border bg-muted/40" />

              <div className="flex-1 space-y-2">
                {/* company name line */}
                <div className="h-2 w-20 rounded-full bg-muted/60" />
                {/* role title line */}
                <div className="h-3.5 w-44 rounded-full bg-muted/50" />
                {/* skill tag pills */}
                <div className="flex gap-1.5 pt-0.5">
                  <div className="h-5 w-12 rounded-full bg-muted/40" />
                  <div className="h-5 w-16 rounded-full bg-muted/35" />
                  <div className="h-5 w-14 rounded-full bg-muted/30" />
                </div>
              </div>

              {/* match badge placeholder */}
              <div className="h-6 w-16 shrink-0 rounded-full bg-muted/40" />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        Job listings will appear here once recruiters join.{" "}
        <Link to="/app/jobs" className="font-semibold text-primary">
          See Jobs →
        </Link>
      </p>
    </div>
  );
}
