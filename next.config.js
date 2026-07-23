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
  async redirects() {
    return [
      // La landing vive en /gestion-administrativa/. Todas las URLs anteriores
      // apuntan directamente ahí, sin encadenar redirecciones entre ellas.
      {
        source: '/gestor-documental',
        destination: '/gestion-administrativa/',
        permanent: true,
      },
      {
        source: '/gestor-documental/:path*',
        destination: '/gestion-administrativa/:path*',
        permanent: true,
      },
      {
        source: '/plataforma',
        destination: '/gestion-administrativa/',
        permanent: true,
      },
      {
        source: '/plataforma/:path*',
        destination: '/gestion-administrativa/:path*',
        permanent: true,
      },
      {
        source: '/gestion-documental',
        destination: '/gestion-administrativa/',
        permanent: true,
      },
      {
        source: '/gestion-documental/:path*',
        destination: '/gestion-administrativa/:path*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      // La home (/) y la versión catalana (/ca/) se sirven como HTML estático
      // desde public/. El root necesita un rewrite explícito porque Next no mapea
      // public/index.html a '/' automáticamente. /ca/ se sirve solo (public/ca/index.html).
      beforeFiles: [
        { source: '/', destination: '/index.html' },
      ],
    };
  },
};

export default nextConfig;
