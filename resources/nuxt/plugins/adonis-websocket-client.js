import ws from 'adonis-websocket-client'
import Vue from 'vue'

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '3333'

const client = ws(`${HOST}:${PORT}`).channel('attendance').connect()

let websocket = {}

websocket.install = (Vue) => {
  Vue.prototype.$client = client
}

Vue.use(websocket)
