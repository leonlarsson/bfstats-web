import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: Home,
});

function Home() {
  return (
    <div>
      <div>Privacy</div>
      <Button>Click me</Button>
    </div>
  );
}
