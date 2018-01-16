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
test('プロフィール画面', async t => {
  const { status } = await http.get('/me')
  t.is(status, 200)
})
test('プロフィール編集画面', async t => {
  const { status } = await http.get('/me/edit')
  t.is(status, 200)
})
test('マネジメント一覧画面', async t => {
  const { status } = await http.get('/management')
  t.is(status, 200)
})
test('ユーザー管理画面', async t => {
  const { status } = await http.get('/management/user')
  t.is(status, 200)
})
test('ユーザー管理詳細画面', async t => {
  const { status } = await http.get('/management/user/1')
  t.is(status, 200)
})
test('ニュース管理画面', async t => {
  const { status } = await http.get('/management/news')
  t.is(status, 200)
})
test('ニュース管理詳細画面', async t => {
  const { status } = await http.get('/management/news/1')
  t.is(status, 200)
})
test('ニュース管理編集画面', async t => {
  const { status } = await http.get('/management/news/1/edit')
  t.is(status, 200)
})
test('企業管理画面', async t => {
  const { status } = await http.get('/management/company')
  t.is(status, 200)
})
test('企業管理編集画面', async t => {
  const { status } = await http.get('/management/company/edit')
  t.is(status, 200)
})
test('勤怠管理', async t => {
  const { status } = await http.get('/management/attendance')
  t.is(status, 200)
})

// @TODO 追加する
