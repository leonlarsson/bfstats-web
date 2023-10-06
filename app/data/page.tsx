const pageTitle = "Data | Battlefield Stats Discord Bot";
const pageDescription = "Dive into the usage data for the Battlefield Stats Discord Bot.";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    type: "website",
    url: "https://battlefieldstats.com/data",
    title: pageTitle,
    description: pageDescription
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    creator: "@mozzyfx",
    images: "/images/example_bf2042.png"
  }
};

export default () => {
  return (
    <div className="container relative">
      <span className="text-3xl font-bold">Data</span>
    </div>
  );
};
