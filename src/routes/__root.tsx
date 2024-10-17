import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="container relative flex flex-col px-4 lg:px-8">
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <Header />
        <div className="flex-1 pb-10">
          <Outlet />
          <TanStackRouterDevtools position="bottom-right" />
        </div>
      </ThemeProvider>
    </div>
  );
}
