/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // No basePath needed since serving from root
  // assetPrefix is not needed for static export when serving from root
  trailingSlash: false,
}

export default nextConfig
