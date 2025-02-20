// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['th.bing.com'],
//       },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'th.bing.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
