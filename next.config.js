/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.APP_BASE_URL
    }
};

module.exports = nextConfig;
