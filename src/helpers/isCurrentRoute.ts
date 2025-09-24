type Props = {
  currentLocale: string | undefined
  url: {
    pathname: string
  }
}

export default ({ currentLocale, url: { pathname } }: Props, route: string | undefined): boolean => {
  const pathnameUrl = pathname.replace(`/${currentLocale}`, '')
  const isCurrent = pathnameUrl.startsWith(route as string)

  return isCurrent
}
