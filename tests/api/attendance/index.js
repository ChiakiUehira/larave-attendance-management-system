const test = require('ava')
const axios = require('axios')
const { _loginInfo } = require('../../context')
var http

test.before(t => {
  return axios.post('http://localhost:3333/api/v1/login', _loginInfo).then(({status, data}) => {
    http = axios.create({
      baseURL: 'http://localhost:3333/api/v1',
      headers: {
        'Authorization': `Bearer ${data.token}`
      }
    })
  })
})

test('出勤一覧取得', async t => {
  const { status } = await http.get(`/attendance?from=2017-09-01&to=2017-09-30`)
  t.is(status, 200)
})

test('出勤個別取得', async t => {
  const { data } = await http.get(`/attendance`)
  const attendance = data.attendances[0]
  const { status } = await http.get(`/attendance/${attendance.id}`)
  t.is(status, 200)
})
