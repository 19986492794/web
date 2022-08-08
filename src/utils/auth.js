import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken(key) {
  let keys = key?key:TokenKey;
  return Cookies.get(keys)
}

export function setToken(key, token) {
  let keys = key?key:TokenKey;
  return Cookies.set(keys, token)
}

export function removeToken(key) {
  let keys = key?key:TokenKey;
  return Cookies.remove(keys)
}
