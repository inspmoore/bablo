const endpoint = `http://${document.domain}:5000/api/rates/`

export function get3Rates(date) {
  return fetch(endpoint + date)
    .then(res => res.json())
    .catch(error => error)
}
