import { createRootRoute } from "@tanstack/react-router";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import "../index.css";
import { Header } from "@/components/Header";
import type * as React from "react";

import { cn } from "@/lib/utils";

export const Route = createRootRoute({
  component: RootComponent,
  meta: () => [
    {
      title: "Battlefield Stats",
    },
  ],
  notFoundComponent: () => <div>Not found</div>,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body className={cn("min-h-screen overflow-y-scroll bg-background")}>
        <div className="container relative flex min-h-screen flex-col px-4 lg:px-8">
          <Header />

          <div className="flex-1 pb-10">
            {/* <Suspense fallback={<HeaderStatsSkeleton />}>
              <HeaderStats />
            </Suspense> */}

            {children}
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  );
}
