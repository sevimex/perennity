// astro.config.pages.mjs (en la RAÍZ del proyecto)
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

export default defineConfig({
  output: 'static',
  prerender: true,
  integrations: [tailwind(), react()],
  i18n: {
    defaultLocale: 'es-mx',
    locales: ['es-mx']   // agrega otros si tienes
  },
  vite: {
    build: { sourcemap: false },
    resolve: {
      alias: {
        'react-html-parser': 'html-react-parser'
      }
    }
  }
})