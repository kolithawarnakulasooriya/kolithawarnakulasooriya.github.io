const nextConfig = {
  output: "export",
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://kolithawarnakulasooriya.github.io/maintanance',
        permanent: true,
        basePath: false,
      },
    ]
  },
  images: { unoptimized: true }
};

module.exports = nextConfig;
