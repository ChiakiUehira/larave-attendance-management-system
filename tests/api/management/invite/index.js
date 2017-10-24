const test = require('ava')
const axios = require('axios')
const { _login, _user } = require('../../../context')
var http

require('dotenv').config()
test.before(t => {
  return axios.post(`${process.env.API_URL}/api/v1/login`, _login).then(({status, data}) => {
    http = axios.create({
      baseURL: `${process.env.API_URL}/api/v1/`,
      headers: {
        'Authorization': `Bearer ${data.token}`
      }
    })
  })
})

test('ユーザ招待', async t => {
  const { data } = await http.post('manager/invite', _user)
  t.is(data.success, true)
})
