import { hourglass } from 'ldrs'

export const onRouteChange = () => {
  window.addEventListener('beforeunload', () => {
    setTimeout(() => {
      showLoader()
      hourglass.register()
    }, 250)
  })

  window.addEventListener('pageshow', () => {
    setTimeout(() => {
      hideLoader()
    }, 5000)
  })
}

export const onDemand = () => {
  showLoader()
  hourglass.register()
}

const showLoader = () => {
  const pageLoader = document.querySelectorAll('.page-loader')

  pageLoader.forEach(
    (loader) => ((loader as HTMLElement).style.display = 'grid')
  )
}

const hideLoader = () => {
  const pageLoader = document.querySelectorAll('.page-loader')

  pageLoader.forEach(
    (loader) => ((loader as HTMLElement).style.display = 'none')
  )
}
