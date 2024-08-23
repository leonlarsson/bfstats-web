/** @type {import('next').NextConfig} */

const inviteRedicts = ["/invite", "/add", "/install"];

const nextConfig = {
  // For when deployed with Docker (on Railway, etc.)
  // output: "standalone",
  redirects: async () =>
    inviteRedicts.map(source => ({
      source,
      destination: "https://discord.com/oauth2/authorize?client_id=842768680252997662",
      permanent: true,
    })),
};

module.exports = nextConfig;
