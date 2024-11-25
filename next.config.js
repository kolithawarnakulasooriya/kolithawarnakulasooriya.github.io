const nextConfig = {
  output: "export",
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/maintanance',
        permanent: false,
      },
    ]
  },
  images: { unoptimized: true }
};

module.exports = nextConfig;
