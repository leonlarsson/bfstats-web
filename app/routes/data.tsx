import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/data")({
  component: Home,
});

function Home() {
  return (
    <div>
      <div>Data</div>
      <Button>Click me</Button>
    </div>
  );
}
