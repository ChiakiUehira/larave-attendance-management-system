'use strict'

const resolve = require('path').resolve
require('dotenv').config()

module.exports = {
  head: {
    title: '勤怠管理',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
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
      }
    ]
  },
  plugins: [
    '~/plugins/element-ui.js',
    '~plugins/http.js'
  ],
  env: {
    API_URL: process.env.API_URL || 'http://0.0.0.0:3333'
  },
  /*
  ** Global CSS
  */
  css: [
    '~assets/css/main.css',
    '~assets/font-awesome/css/font-awesome.min.css',
    'element-ui/lib/theme-default/index.css'
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#324157' },
  /*
  ** Point to resources
  */
  srcDir: resolve(__dirname, '../resources/nuxt')
}
