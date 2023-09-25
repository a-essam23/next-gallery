/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: false,
    compiler: {
        styledComponents: true,
    },
    images: {
        domains: [
            "i.imgur.com",
            "imgur.com",
            "elkhedewaya.fra1.digitaloceanspaces.com",
            "fra1.digitaloceanspaces.com",
            "elkhedewaya.fra1.cdn.digitaloceanspaces.com",
        ],
        // unoptimized: true,
    },
};

module.exports = nextConfig;
