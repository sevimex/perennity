interface IsVisibleOptions {
  inOut?: boolean
  visible?: () => void
  notVisible?: () => void
  options?: IntersectionObserverInit
  once?: boolean
}

export default (
  element: Element,
  {
    inOut = false,
    visible = () => {},
    notVisible = () => {},
    options = {}
  }: IsVisibleOptions
) => {
  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      entry.isIntersecting ? visible() : inOut ? notVisible() : null
    })
  }

  const config = {
    root: null,
    rootMargin: '0% 0% 0% 0%',
    threshold: 0,
    ...options
  }

  const observer = new IntersectionObserver(callback, config)

  observer.observe(element)

  return
}
