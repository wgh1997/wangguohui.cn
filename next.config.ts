module.exports = {
  reactStrictMode: true,
  swcMinify: false,
  async redirects() {
    return [
      { source: '/media', destination: `http://0.0.0.0:8001/media`,permanent:true},
    ]
  },
  images: {
    domains: [
      'http://0.0.0.0:8001', // Cloudinary
    ]
  },
}

export {}


