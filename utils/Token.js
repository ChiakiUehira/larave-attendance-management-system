
const cookie = require('cookie')
const jsCookie = require('js-cookie')

export const setToken = (token) => {
  return jsCookie.set('__t', token)
}

export const getToken = (req) => {
  return cookie.parse(req.headers.cookie).__t
}

export const hasToken = (req) => {
  return Boolean(cookie.parse(req.headers.cookie).__t)
}

export const remove = () => {
  return jsCookie.remove('__t')
}
