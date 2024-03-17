const normalizeWordChar = (text: string) => {
  if (!text) {
    return ''
  }

  const firstChar = text[0].toUpperCase()

  return `${firstChar}+${text.slice(1, text.length)}`
}

export default normalizeWordChar