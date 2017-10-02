const test = require('ava')
const axios = require('axios')

const http = axios.create({
  baseURL: 'http://0.0.0.0:3333/api/v1/article'
})

test('記事の一覧取得', t => {
  return http.get('/').then(({status, data}) => {
    t.is(status, 200)
  })
})

test('記事の個別取得', t => {
  return http.get('/1').then(({status, data}) => {
    t.is(status, 200)
  })
})

test('記事の登録', t => {
  const payload = {
    title: '台風の日',
    content: '台風の夜だった...'
  }
  return http.post('/', payload).then(({status, data}) => {
    t.is(status, 200)
  })
})

test('記事の更新', t => {
  const payload = {
    title: '台風の日',
    content: '台風の夜だった...'
  }
  return http.put('/1', payload).then(({status, data}) => {
    t.is(status, 200)
  }).catch(({status, data}) => {
    t.is(status, 500)
  })
})

test('記事の削除', t => {
  return http.delete('/1').then(({status, data}) => {
    t.is(status, 200)
  }).catch(({status, data}) => {
    t.is(status, 500)
  })
})
