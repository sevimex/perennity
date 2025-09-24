export const urlQueryToString = (query: Record<string, any>): string => {
  const queryString = new URLSearchParams(query).toString()

  return queryString
}

export const urlQueryToObject = (query: string): object => {
  const q = query.includes('?') ? query.slice(query.indexOf('?')) : query
  const queryObject = q && !q.includes('://') ? Object.fromEntries(new URLSearchParams(q)) : {}

  return queryObject
}
