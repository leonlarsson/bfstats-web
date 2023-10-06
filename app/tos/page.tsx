const pageTitle = "Terms of Service | Battlefield Stats Discord Bot";
const pageDescription = "Read the Terms of Service for the Battlefield Stats Discord Bot.";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    type: "website",
    url: "https://battlefieldstats.com/tos",
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
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <h5>(Updated March 6, 2022)</h5>

      <br />

      <div>
        <b>By using this service, you agree to the below points:</b>
        <ul className="ml-4 list-inside list-disc">
          <li>You will not abuse this bot or spam requests.</li>
          <li>You will not use this bot to harass people.</li>
          <li>You will not use this bot to violate EA's or Discord's Terms of Service or Community Guidelines.</li>
          <li>You will not use this bot for any illegal activities.</li>
        </ul>

        <br />

        <b>I reserve the right to block any person and/or server whenever I wish, for reasons including (but not limited to) the points above.</b>
      </div>
    </div>
  );
};
