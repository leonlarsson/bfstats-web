/** @type {import('next').NextConfig} */

const inviteRedicts = ["/invite", "/add", "/install"];

const nextConfig = {
  redirects: async () =>
    inviteRedicts.map(source => ({
      source,
      destination: "https://discord.com/oauth2/authorize?client_id=842768680252997662",
      permanent: true,
    })),
};

module.exports = nextConfig;
