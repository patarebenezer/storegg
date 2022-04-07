/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images:{
    domains:['http://localhost:3001/']
  }
}

module.exports = {
  env: {
    customKey: 'http://localhost:3001/',
  },
}