import { getAbsoluteLocaleUrl } from 'astro:i18n'

import * as mx from './translations/mx'
// import * as us from './translations/us'

export const dictionaries = {
  mx: mx,
  // us: us
}

export const locales = {
  mx: 'es-mx',
  // us: 'en-us'
}

export const config = {
  defaultLocale: locales.mx,
  defaultDictionary: mx
}

// prettier-ignore
export const getI18n = ({ currentLocale = config.defaultLocale }: {currentLocale: string | undefined}) => {
  if (currentLocale === locales.mx) return mx
  // if (currentLocale === locales.us) return us

  return config.defaultDictionary
}

export const getI18nServer = (currentLocale: string) => {
  // const locale = currentLocale.split('-')[1] as 'mx' | 'us'
  const locale = currentLocale.split('-')[1] as 'mx'

  return dictionaries[locale]
}

export const getLocaleUrl = ({ currentLocale = '' }: {currentLocale: string | undefined}, url: string | undefined ) => {
  const localeUrl = getAbsoluteLocaleUrl(currentLocale, url)
  const removeLastSlash =
    localeUrl.length > 1 && localeUrl.endsWith('/')
      ? localeUrl.slice(0, -1)
      : localeUrl

  return removeLastSlash
}

export const getCurrentLocaleFromUrl = (url: string) => {
  const pathname = new URL(url).pathname
  const localePattern = new RegExp(`^\\/(${Object.values(locales).join('|')})`)
  const localeMatch = pathname.match(localePattern)
  const currentLocale = localeMatch ? localeMatch[1] : config.defaultLocale

  return currentLocale
}
