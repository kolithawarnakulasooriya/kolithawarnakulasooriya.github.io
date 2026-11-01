/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    // Keep page routes distinct from public asset directories such as /gallery.
    trailingSlash: true,
    reactStrictMode: true,
    images: { unoptimized: true }
};

export default nextConfig;
