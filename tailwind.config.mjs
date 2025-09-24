/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      xs: '23.4375rem' /* 375px */,
      sm: '37.5rem' /* 600px */,
      md: '48rem' /* 768px */,
      lg: '64rem' /* 1024px */,
      xl: '85.375rem' /* 1366px */,
      xxl: '90rem' /* 1440px */,

      xs_: '23.375rem' /* 374px */,
      sm_: '37.4375rem' /* 599px */,
      md_: '47.9375rem' /* 767px */,
      lg_: '63.9375rem' /* 1023px */,
      xl_: '85.3125rem' /* 1365px */,
      xxl_: '89.9375rem' /* 1439px */
    },
    colors: {
      black: '#000',
      white: '#fff',
      primary: '#103267',
      secondary: '#32ACE6',

      error: '#ee5253',
      whatsapp: '#25D366',
      success: '#3D8E6D',

      placeholder: '#B1B1B1',

      gray: {
        100: '#F7F7F7',
        200: '#E6E6E6',
        300: '#F8F8F8',
        400: '#EFEFEF',
        500: '#F4F4F4',
        600: '#F8F8F8',
        700: '#848484',
      },

      blue: {
        100: '#103267',
        200: '#174B83',
        300: '#32ACE6',
        400: '#6BD6F5',
        500: '#3CBBFD33'
      },

      error: '#f00'
    },
    fontFamily: {
      primary: ['Montserrat Variable'],
      secondary: ['Montserrat Variable']
    },
    extend: {}
  },
  plugins: []
}
