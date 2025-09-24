import { locales, dictionaries, config } from '@/i18n/utils'

type Props = {
  currentLocale: string | undefined
  url: {
    pathname: string
  }
}

export default ({
  currentLocale,
  url: { pathname: p }
}: Props): { currentRouteName: string; locale: string } => {
  const r = Object.entries(locales).map(([key]) => {
    const routes = dictionaries[key as keyof typeof dictionaries].routes
    const pathname = p.replace(`/${currentLocale}`, '')

    // prettier-ignore
    const routeName = Object.entries(routes).find(([, url]) => url.startsWith(pathname))

    return routeName ? routeName?.[0] : ''
  })

  const routes = r.filter((i) => i)
  const routeName = routes?.[0] ?? 'home.index'

  return {
    currentRouteName: routeName,
    locale: config.defaultLocale !== currentLocale ? `/${currentLocale}` : ''
  }
}

type _Props = {
  prefix: string
  currentRouteName: string
}

export const getCurrentRouteByPrefix = ({
  prefix,
  currentRouteName
}: _Props): { route: string; locale: string } => {
  const d = dictionaries[prefix as keyof typeof dictionaries]
  const route = d.routes[currentRouteName as keyof typeof d.routes]

  const currentLocale = locales[prefix as keyof typeof locales]

  return {
    route,
    locale: config.defaultLocale !== currentLocale ? `/${currentLocale}` : ''
  }
}
