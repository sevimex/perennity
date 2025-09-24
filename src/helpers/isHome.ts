type Props = {
  currentLocale: string | undefined
  url: {
    pathname: string
  }
}

export default ({ currentLocale, url: { pathname } }: Props): boolean => {
  const isHome =
    pathname === '/' ||
    pathname.endsWith(`/${currentLocale}/`) ||
    pathname.endsWith(`/${currentLocale}`)

  return isHome
}
