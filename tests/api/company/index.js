const test = require('ava')
const axios = require('axios')
const { _login, _company } = require('../../context')
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

test('会社個別取得', async t => {
  const { status } = await http.get(`/company`)
  t.is(status, 200)
})

// test('会社登録', async t => {
//   const { status } = await http.post(`/company`, _company)
//   t.is(status, 200)
// })

test('会社編集', async t => {
  const { status } = await http.put(`/company`, _company)
  t.is(status, 200)
})

// test('会社削除', async t => {
//   const { status } = await http.delete(`/company`)
//   t.is(status, 200)
// })
