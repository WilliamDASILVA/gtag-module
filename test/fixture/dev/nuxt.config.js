const { resolve } = require('path')

module.exports = {
  dev: true,
  rootDir: resolve(__dirname, '../..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  modules: [
    { handler: require('../../../') }
  ],
  gtag: {
    id: 'UA-XXX-XX'
  },
  publicRuntimeConfig: {
    gtag: {
      id: 'UA-HELLO-WORLD'
    }
  }
}
