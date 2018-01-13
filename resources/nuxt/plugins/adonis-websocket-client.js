import ws from 'adonis-websocket-client'
import Vue from 'vue'

const client = ws(process.env.SOCKET_URL).channel('job').connect()
let websocket = {}

websocket.install = (Vue) => {
  Vue.prototype.$client = client
}

Vue.use(websocket)

