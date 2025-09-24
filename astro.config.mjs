import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

import react from '@astrojs/react'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: 'es-mx',
    locales: ['es-mx']
  },

  image: {
    domains: [
      '127.0.0.1',
      'localhost',
      'picsum.photos',
      'dinkbit.s3.amazonaws.com'
    ]
  },

  trailingSlash: 'ignore',
  output: 'server',
  integrations: [tailwind(), react()],

  devToolbar: {
    enabled: false
  },

  adapter: vercel({
    imageService: true,
    devImageService: 'sharp'
  })
})
