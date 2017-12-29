
const cookie = require('cookie')
const jsCookie = require('js-cookie')

export const setToken = (token) => {
  return jsCookie.set('__t', token)
}

export const getToken = (cookieString) => {
  return cookie.parse(cookieString).__t
}

export const hasToken = (cookieString = '') => {
  const obj = cookie.parse(cookieString)
  return obj.hasOwnProperty('__t')
}

export const remove = () => {
  return jsCookie.remove('__t')
}
