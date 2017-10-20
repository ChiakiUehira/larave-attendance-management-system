const test = require('ava')
const axios = require('axios')
const { _login, _user } = require('../../../context')
var http

test.before(t => {
  return axios.post('http://0.0.0.0:3333/api/v1/login', _login).then(({status, data}) => {
    http = axios.create({
      baseURL: 'http://0.0.0.0:3333/api/v1',
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
