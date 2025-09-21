/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sw7qdbz5kk.ufs.sh',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
