import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tos")({
  component: Home,
});

function Home() {
  return (
    <div>
      <div>TOS</div>
      <Button>Click me</Button>
    </div>
  );
}
