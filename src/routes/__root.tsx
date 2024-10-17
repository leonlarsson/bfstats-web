import { Header } from "@/components/Header";
import { HeaderStats } from "@/components/HeaderStats";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { lazy } from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="container relative flex min-h-screen flex-col px-4 lg:px-8">
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <Header />
        <div className="flex-1 pb-10">
          <HeaderStats />
          <Outlet />
          <TanStackRouterDevtools position="bottom-right" />
        </div>
      </ThemeProvider>
    </div>
  );
}
