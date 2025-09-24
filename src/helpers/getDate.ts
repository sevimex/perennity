import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/es-mx.js'

dayjs.extend(customParseFormat)

type Date = {
  date?: string
  input?: string /* @docs https://day.js.org/docs/en/parse/string-format */
  output?: string /* @docs https://day.js.org/docs/en/display/format */
}

export const getDate = (props?: Date) => {
  const defaultFormat = 'YYYY-MM-DD'

  if (!props) return dayjs().format(defaultFormat)

  const { date, input, output = defaultFormat } = props

  const d = dayjs(date, input).isValid()
    ? dayjs(date, input).format(output)
    : 'Invalid Date'

  return d
}

export const setDayjs = (locale: string): void => {
  dayjs.locale(locale)
}
