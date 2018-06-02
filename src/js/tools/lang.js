export function getLang() {
  const detectedLang =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage

  const isPl = detectedLang.match(/pl/)
  const isUk = detectedLang.match(/uk/)

  if (isUk) return 'uk'
  if (isPl) return 'pl'
  return 'en'
}
