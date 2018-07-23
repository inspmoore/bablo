let endpoint = ''
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  endpoint = `http://${document.domain}:5000/api/rates/`
} else {
  endpoint = `https://${document.domain}/api/rates/`
  // production code
}

export function get3Rates(date) {
  return fetch(endpoint + date)
    .then(res => res.json())
    .catch(error => error)
}
