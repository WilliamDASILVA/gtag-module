const { resolve } = require('path')
const logger = require('./logger')

module.exports = function (moduleOptions) {
  const options = {
    debug: false,
    config: {},
    disableAutoPageTrack: false,
    additionalAccounts: [],
    ...this.options.gtag,
    ...moduleOptions
  }

  const skipAll = this.options.dev && !options.debug

  if (!options.id) {
    logger.warn('No id provided.')
    return
  }

  // need to render even in skipAll to generate noop $gtag function
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'gtag.js',
    ssr: false,
    options: {
      skipAll,
      ...options
    }
  })

  if (skipAll) {
    logger.debug('Skipping gtag in dev mode.')
  }
}

module.exports.meta = require('../package.json')
