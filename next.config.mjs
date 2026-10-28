/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [{source: '/request-service', destination: '/book', permanent: false}];
  },
};
export default nextConfig;
