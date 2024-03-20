import { Suspense } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import HeaderStats, { HeaderStatsSkeleton } from "@/components/HeaderStats";

const inter = Inter({ subsets: ["latin"] });

const pageTitle = "Battlefield Stats Discord Bot";
const pageDescription = "Supercharge your Discord with real-time Battlefield game stats - Battlefield 2042, V, 1, and more. Add the bot now for an elite gaming experience!";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  metadataBase: new URL("https://battlefieldstats.com"),
  openGraph: {
    type: "website",
    url: "https://battlefieldstats.com",
    title: pageTitle,
    description: pageDescription,
    siteName: "Battlefield Stats Discord Bot",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    creator: "@mozzyfx",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen overflow-y-scroll bg-background", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="container relative flex min-h-screen flex-col px-4 lg:px-8">
            <Header />

            <div className="flex-1 pb-10">
              <Suspense fallback={<HeaderStatsSkeleton />}>
                <HeaderStats />
              </Suspense>

              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
