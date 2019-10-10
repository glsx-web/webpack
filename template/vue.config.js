'use strict'
const titles = require('./title.js')
const glob = require('glob')
const pages = {}
// const mode = process.env.NODE_ENV || 'development'
glob.sync('./src/views/**/app.js').forEach(path => {
  const chunk = path.split('./src/views/')[1].split('/app.js')[0]
  pages[chunk] = {
    entry: path,
    template: 'public/index.html',
    title: titles[chunk],
    chunks: ['chunk-vendors', 'chunk-common', chunk]
  }
})
module.exports = {
  pages,
  chainWebpack: config => config.plugins.delete('named-chunks'),
  configureWebpack: (config) => {
    // config.devtool = (mode === 'development') ? 'inline-source-map' : false
    // config.mode = mode
  },
  devServer: {
    port: 8085,
    host: 'localhost',
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
