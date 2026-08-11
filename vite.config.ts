import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * The Content-Security-Policy is defined once here and injected into index.html
 * at build time so the dev server and the production bundle stay in sync.
 * Production hosts additionally send it (and the rest of the security headers)
 * as real HTTP headers - see public/_headers and vercel.json.
 */
// frame-ancestors is deliberately absent: browsers ignore it in a <meta> tag.
// It is enforced as a real header (public/_headers, vercel.json) instead.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'", // inline styles are needed for animated transforms
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://api.web3forms.com",
  "form-action 'self' https://api.web3forms.com",
  "frame-src https://www.google.com https://maps.google.com",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'inject-csp',
      transformIndexHtml(html) {
        return html.replace('%CSP%', CSP)
      },
    },
  ],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Keep the framework and the animation library in their own long-lived
        // chunks so a copy change does not invalidate them.
        manualChunks(id: string) {
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion'))
            return 'motion'
          if (/node_modules\/(react|react-dom|react-router)/.test(id)) return 'react'
          return undefined
        },
      },
    },
  },
})
