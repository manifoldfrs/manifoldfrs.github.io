/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static exports for GitHub Pages
  trailingSlash: true, // Ensure compatibility with GitHub Pages
  images: {
    unoptimized: true // Required for static export
  }
}

module.exports = nextConfig