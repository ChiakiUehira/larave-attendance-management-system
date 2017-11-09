const test = require('ava')
const axios = require('axios')
const { _login } = require('../context')
var http

require('dotenv').config()
test.before(t => {
  return axios.post(`${process.env.API_URL}/api/v1/login`, _login).then(({status, data}) => {
    http = axios.create({
      baseURL: `${process.env.API_URL}`,
      headers: {
        'Authorization': `Bearer ${data.token}`,
        'Cookie': `__t=${data.token}`
      }
    })
  })
})

test('ホーム画面', async t => {
  const { status } = await http.get('/')
  t.is(status, 200)
})

test('マイページ画面', async t => {
  const { status } = await http.get('/me')
  t.is(status, 200)
})

test('ステート画面', async t => {
  const { status } = await http.get('/state')
  t.is(status, 200)
})

test('ユーザ一覧画面', async t => {
  const { status } = await http.get('/user')
  t.is(status, 200)
})

test('ユーザ詳細画面', async t => {
  const { status } = await http.get('/user/1')
  t.is(status, 200)
})

test('レポート画面', async t => {
  const { status } = await http.get('/report')
  t.is(status, 200)
})

test('ニュース画面', async t => {
  const { status } = await http.get('/news')
  t.is(status, 200)
})

test('ニュース詳細画面', async t => {
  const { status } = await http.get('/news/1')
  t.is(status, 200)
})

// @TODO 追加する
