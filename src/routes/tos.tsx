import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tos")({
  component: TosComponent,
});

function TosComponent() {
  return (
    <div className="container px-4 py-12 lg:px-8">
      <span className="eyebrow mb-4">Rules of engagement</span>
      <h1 className="display text-4xl sm:text-6xl">
        Terms of Service<span className="text-primary">.</span>
      </h1>
      <div className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Updated March 6, 2022
      </div>

      <div className="mt-10 max-w-3xl space-y-6">
        <div className="panel clip-notch-sm p-6">
          <b>By using this service, you agree to the below points:</b>
          <ul className="mt-3 ml-4 list-outside list-disc space-y-2 text-muted-foreground marker:text-primary">
            <li>You will not abuse this bot or spam requests.</li>
            <li>You will not use this bot to harass people.</li>
            <li>You will not use this bot to violate EA's or Discord's Terms of Service or Community Guidelines.</li>
            <li>You will not use this bot for any illegal activities.</li>
          </ul>
        </div>

        <p className="font-semibold">
          I reserve the right to block any person and/or server whenever I wish, for reasons including (but not limited
          to) the points above.
        </p>
      </div>
    </div>
  );
}
