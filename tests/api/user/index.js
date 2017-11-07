const test = require('ava')
const axios = require('axios')
const { _login, _user, _password } = require('../../context')
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

test('ユーザ一覧取得', async t => {
  const { status } = await http.get('/user')
  t.is(status, 200)
})

test('ユーザ個別取得', async t => {
  const { data } = await http.get('/user')
  const [user] = data.users
  const { status } = await http.get(`/user/${user.id}`)
  t.is(status, 200)
})

test('ユーザ登録', async t => {
  const { status } = await http.post(`/user`, _user)
  t.is(status, 200)
})

test('ユーザ編集', async t => {
  const { data } = await http.get('/user')
  const [user] = data.users
  const { status } = await http.put(`/user/${user.id}`, _user)
  t.is(status, 200)
})

// test('ユーザ削除', async t => {
//   const { data } = await http.get('/user')
//   const [user] = data.users
//   const { status } = await http.delete(`/user/${user.id}`)
//   t.is(status, 200)
// })

test('パスワード変更', async t => {
  const { status } = await http.put(`/user/password`, _password)
  t.is(status, 200)
})