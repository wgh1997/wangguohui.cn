module.exports = {
  reactStrictMode: true,
  swcMinify: false,
  async redirects() {
    return [
      { source: '/media', destination: `http://42.192.148.228:8001/media`,permanent:true},
    ]
  },
  images: {
    domains: [
      'http://42.192.148.228:8001', // Cloudinary
    ]
  },
}

export {}


