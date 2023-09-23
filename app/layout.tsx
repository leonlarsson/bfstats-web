import { Suspense } from "react";
import Script from "next/script";
import Nav from "./components/Nav";
import StatsText from "./components/StatsText";

import "bootstrap/dist/css/bootstrap.css";
import "../public/fontawesome/css/fontawesome.min.css";
import "../public/fontawesome/css/solid.min.css";
import "../public/fontawesome/css/brands.min.css";

const pageTitle = "Battlefield Stats Discord Bot";
const pageDescription = "Supercharge your Discord with real-time Battlefield game stats - Battlefield 2042, V, 1, and more. Invite the bot now for an elite gaming experience!";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  themeColor: "#7289da",
  icons: "/favicon.ico",
  metadataBase: new URL("https://battlefieldstats.com"),
  openGraph: {
    type: "website",
    url: "https://battlefieldstats.com",
    title: pageTitle,
    description: pageDescription,
    images: {
      url: "/images/example_bf2042.png",
      width: 1200,
      height: 750
    }
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    creator: "@mozzyfx",
    images: "/images/example_bf2042.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ overflowY: "scroll" }}>
      <Script strategy="lazyOnload" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" />
      <body>
        <Nav />
        <div className="container">
          <Suspense fallback={<h3 className="text-center">Loading stats...</h3>}>
            {/* @ts-expect-error */}
            <StatsText />
          </Suspense>
          {children}
        </div>
      </body>
    </html>
  );
}
