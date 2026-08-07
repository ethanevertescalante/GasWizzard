/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ["huntsman-reenter-giggling.ngrok-free.dev"],
    async redirects() {
        return [
            {
                source: '/',
                destination: '/map',
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
