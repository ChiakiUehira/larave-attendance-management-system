const test = require('ava')
const axios = require('axios')
const { _loginInfo, _user } = require('../../context')
var http

test.before(t => {
  return axios.post('http://0.0.0.0:3333/api/v1/login', _loginInfo).then(({status, data}) => {
    http = axios.create({
      baseURL: 'http://0.0.0.0:3333/api/v1',
      headers: {
        'Authorization': `Bearer ${data.token}`
      }
    })
  })
})

test('ユーザ一覧取得', async t => {
  const { status } = await http.get('/user')
  t.is(status, 200)
})

test('ユーザ個別取得', async t => {
  const { data } = await http.get('/user')
  const user = data.users[0]
  const { status } = await http.get(`/user/${user.id}`)
  t.is(status, 200)
})

test('ユーザ登録', async t => {
  const { status } = await http.post(`/user`, _user)
  t.is(status, 200)
})

test('ユーザ編集', async t => {
  const { data } = await http.get('/user')
  const user = data.users[0]
  const { status } = await http.put(`/user/${user.id}`, _user)
  t.is(status, 200)
})

test('ユーザ削除', async t => {
  const { data } = await http.get('/user')
  const user = data.users[0]
  const { status } = await http.delete(`/user/${user.id}`)
  t.is(status, 200)
})
