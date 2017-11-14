'use strict'

const resolve = require('path').resolve
const nodeExternals = require('webpack-node-externals')

module.exports = {
  head: {
    title: '勤怠管理',
    meta: [
      {
        charset: 'utf-8'
      },
      // {
      //   name: 'viewport',
      //   content: 'width=device-width, initial-scale=1'
      // },
      {
        hid: 'description',
        name: 'description',
        content: '勤怠管理'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600|Roboto%20Mono'
      }
    ]
  },
  build: {
    extend (config, {isServer}) {
      if (isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vue-awesome/]
          })
        ]
      }
    },
    vendor: ['vue-awesome', 'adonis-websocket-client']
  },
  plugins: [
    '~/plugins/element-ui.js',
    '~/plugins/http.js',
    '~/plugins/vue-awesome.js',
    { src: '~plugins/adonis-websocket-client.js', ssr: false },
  ],
  router: {
    middleware: ['auth']
  },
  env: {
    API_URL: process.env.API_URL || 'http://0.0.0.0:3333'
  },
  /*
   ** Global CSS
   */
  css: [
    '~assets/css/main.css',
    'element-ui/lib/theme-chalk/index.css',
    'github-markdown-css/github-markdown.css',
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: {color: '#58a8ff'},
  /*
   ** Point to resources
   */
  srcDir: resolve(__dirname, '../resources/nuxt')
}
