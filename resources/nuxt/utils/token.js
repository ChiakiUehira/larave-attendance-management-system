
export const setToken = (token) => {
  document.cookie = `__t=${token}`
}

export const getToken = (req) => {
  if (!req.headers.cookie) return false
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('__t='))
  if (!jwtCookie) return false
  const token = jwtCookie.split('=')[1]
  return token
}
