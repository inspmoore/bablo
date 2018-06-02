export function isIphone() {
  const platform = navigator.platform
  return (
    platform.toLowerCase() === 'iphone' &&
    'standalone' in window.navigator &&
    window.navigator.standalone
  )
}
