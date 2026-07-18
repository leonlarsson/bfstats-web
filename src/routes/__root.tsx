import { createRootRoute, Outlet } from "@tanstack/react-router";
import { lazy } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import("@tanstack/react-router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <TanStackRouterDevtools position="bottom-right" />
      </div>
    </ThemeProvider>
  );
}
