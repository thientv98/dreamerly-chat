export const generateSortedId = (ids: Array<string>) => {
  return ids.sort().join('_')
}