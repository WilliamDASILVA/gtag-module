function loadScript (src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = src

    const head = document.head || document.getElementsByTagName('head')[0]
    head.appendChild(script)

    script.onload = resolve
    script.onerror = reject
  })
}

export default async function ({ $config, app: { router }}, inject) {
  const runtimeConfig = $config && $config.gtag || {}
  const moduleOptions = <%= serialize(options) %>
  const options = {...moduleOptions, ...runtimeConfig}

  if (options.skipAll) {
    // inject empty gtag function for disabled mode
    inject('gtag', () => {})
    return
  }

  if (process.client) {
    await loadScript(`https://www.googletagmanager.com/gtag/js?id=${options.id}`)
  }

  window.dataLayer = window.dataLayer || []

  function gtag () {
    dataLayer.push(arguments)

    if (options.debug) {
      console.debug('gtag tracking called with following arguments:', arguments)
    }
  }

  inject('gtag', gtag)
  gtag('js', new Date())
  gtag('config', options.id, JSON.stringify(options.config, null, 2))

  if (!options.disableAutoPageTrack) {
    router.afterEach((to) => {
      gtag('config', options.id, { 'page_path': to.fullPath, 'location_path': window.location.origin + to.fullPath })
    })
  }

  // additional accounts
  Array.isArray(options.additionalAccounts) && options.additionalAccounts.forEach((account) => {
    gtag('config', account.id, JSON.stringify(account.config, null, 2))
  })
}
