const nextConfig = {
  output: "export",
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/maintanance',
        permanent: true,
      },
    ]
  },
  images: { unoptimized: true }
};

module.exports = nextConfig;
