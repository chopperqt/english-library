export const checkUniqueWord = (str: string, words: string[]) => {
  return !words
    .filter((word) => {
      return word.toLowerCase().replace(' ', '') === str.toLowerCase().replace(' ', '')
    })
    .length
}
