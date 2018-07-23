// checks if the app is launched in a standalone mode on iP X
export function isIphone() {
  const platform = navigator.platform
  return (
    platform.toLowerCase() === 'iphone' &&
    'standalone' in window.navigator &&
    window.navigator.standalone
  )
}
