export const arrayChunks = <T>(array: T[], size: number): T[][] => {
  if (size <= 0) throw new Error('Chunk size must be greater than 0')
  if (!array.length) return []

  const head = array.slice(0, size)
  const tail = array.slice(size)

  return [head, ...arrayChunks(tail, size)]
}
