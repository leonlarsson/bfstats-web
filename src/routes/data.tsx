import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/data")({
  component: () => <div>Hello /data!</div>,
});
