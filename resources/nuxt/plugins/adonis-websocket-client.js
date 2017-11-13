import ws from 'adonis-websocket-client'
import Vue from 'vue'

const client = ws(`${process.env.HOST}:${process.env.PORT}`, {}).channel('attendance').connect()

let websocket = {}

websocket.install = (Vue) => {
  Vue.prototype.$client = client
}

Vue.use(websocket)
