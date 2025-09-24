import Splide from '@splidejs/splide'
import '@splidejs/splide/css/core'

export const splideCarousel = () => {
  const carousel = document.querySelector(`.testimonials-carousel`)

  if (!carousel) return

  const c = new Splide(carousel as HTMLElement, {
    arrows: false,
    gap: '1rem',
    pagination: true,
    perPage: 3,
    type: 'loop',
    breakpoints: {
      1199: {
        perPage: 2
      },
      799: {
        gap: '0rem',
        perPage: 1
      }
    }
  })

  c.mount()
}
