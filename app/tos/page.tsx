const pageTitle = "Terms of Service | Battlefield Stats Discord Bot";
const pageDescription = "Terms of Service for the Battlefield Stats Discord Bot.";

export const metadata = {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
        type: "website",
        url: "https://battlefieldstats.com/tos",
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

const Tos = () => {
    return (
        <>
            <h1 className="text-decoration-underline">Terms of Service</h1>
            <h5>(Updated March 6, 2022)</h5>

            <div className="pb-3">
                <h3>By using this service, you agree to the below points:</h3>
                <ul>
                    <li>You will not abuse this bot or spam requests.</li>
                    <li>You will not use this bot to harass people.</li>
                    <li>You will not use this bot to violate EA's or Discord's Terms of Service or Community Guidelines.</li>
                    <li>You will not use this bot for any illegal activities.</li>
                </ul>
            </div>
            <h3>I reserve the right to block any person and/or server whenever I wish, for reasons including (but not limited to) the points above.
            </h3>
        </>
    );
};

export default Tos;