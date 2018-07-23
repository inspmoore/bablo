// a singleton exposing simple API to localStorage

class Storage {
  set(key, value) {
    window.localStorage.setItem(key, value)
  }

  get(key) {
    return window.localStorage.getItem(key)
  }

  storeObject(o) {
    Object.keys(o).forEach(val => {
      window.localStorage.setItem(val, JSON.stringify(o[val]))
    })
  }

  loadKeys(keys) {
    const o = {}
    keys.forEach(val => {
      o[val] = JSON.parse(window.localStorage.getItem(val))
    })
    return o
  }
}

export default new Storage()
