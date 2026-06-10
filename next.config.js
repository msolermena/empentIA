/** @type {import('next').NextConfig} */
const nextConfig = {
  // Las URLs canónicas, el sitemap, los hreflang y todos los enlaces internos
  // usan la forma CON barra final. Con trailingSlash:true esa forma devuelve 200
  // directamente (antes hacía 308 → versión sin barra), evitando redirecciones
  // en las URLs indexables.
  trailingSlash: true,
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      { source: '/landing-webchat/', destination: '/landing-webchat/index.html' },
    ];
  },
};

export default nextConfig;
