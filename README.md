# @williamdasilva/gtag-module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Circle CI][circle-ci-src]][circle-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> Google official [gtagjs](https://developers.google.com/analytics/devguides/collection/gtagjs/) for [Nuxt.js](https://nuxtjs.org)

[📖 **Release Notes**](./CHANGELOG.md)

# Note
This module is a fork of https://github.com/nuxt-community/google-gtag-module. Using it to be compatible with latest version of Nuxt including runtime configs.

## Features

The module includes Google `googletagmanager.com/gtag/js` into your project and enables it with config you pass in as options.

* Check the official reference [gtagjs](https://developers.google.com/analytics/devguides/collection/gtagjs/)

## Setup

1. Add `@williamdasilva/gtag-module` dependency to your project

```bash
yarn add @williamdasilva/gtag-module # or npm install @williamdasilva/gtag-module
```

2. Add `@williamdasilva/gtag-module` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    '@williamdasilva/gtag-module',

    // With options
    ['@williamdasilva/gtag-module', { /* module options */ }]
  ]
}
```

### Using top level options

```js
{
  modules: [
    '@williamdasilva/gtag-module'
  ],
  'google-gtag': {
    id: 'UA-XXXX-XX',
    config: {
      anonymize_ip: true, // anonymize IP 
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
      linker: {
        domains: ['domain.com','domain.org']
      }
    },
    debug: true, // enable to track in dev mode
    disableAutoPageTrack: false, // disable if you don't want to track each page route with router.afterEach(...).
    additionalAccounts: [{
      id: 'AW-XXXX-XX', // required if you are adding additional accounts
      config: {
        send_page_view: false // optional configurations
      }
    }]
  }
}
```

### Using runtime config

```js
{
  modules: [
    '@williamdasilva/gtag-module'
  ],
  'google-gtag': {
    config: {
      anonymize_ip: true, // anonymize IP 
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
      linker: {
        domains: ['domain.com','domain.org']
      }
    },
    debug: true, // enable to track in dev mode
    disableAutoPageTrack: false, // disable if you don't want to track each page route with router.afterEach(...).
    additionalAccounts: [{
      id: 'AW-XXXX-XX', // required if you are adding additional accounts
      config: {
        send_page_view: false // optional configurations
      }
    }]
  },
  publicRuntimeConfig: {
    gtag: {
      id: 'UA-XXXX-XX'
    }
  }
}
```

## Options

### `id` (required)

Google Analytics property ID.

### `config`

- Default: `{}`

Config options for [gtagjs](https://developers.google.com/analytics/devguides/collection/gtagjs/)

### `debug`

- Default: `false`

Enable to track in dev mode.

### `disableAutoPageTrack`

- Default: `false`

Disable if you don't want to track each page route with router.afterEach(...).

### `additionalAccounts`

- Default: `[]`

You can add more configuration like [AdWords](https://developers.google.com/adwords-remarketing-tag/#configuring_the_global_site_tag_for_multiple_accounts)

## Usage

This module includes Google gtag in your NuxtJs project and enables every page tracking by default.
You can use gtag inside of your components/functions/methods like follow:

```js
this.$gtag('event', 'your_event', { /* track something awesome */})
```

#### To make sure that every page is tracked correctly
As the router code sometimes runs before head data is set correctly you can use following approach to make sure that everything is set correctly:

```js
// make sure to set disableAutoPageTrack: true inside of nuxt.config.js
// inside of your Page.vue/Layout.vue file
 mounted() {
    if (process.browser) {
      this.$gtag('config', 'UA-XXXX-XXX', {
        page_title: this.$metaInfo.title,
        page_path: this.$route.fullPath,
      })
    }
  }
```

See official docs:

* [gtagjs](https://developers.google.com/analytics/devguides/collection/gtagjs/)
* [adwords](https://developers.google.com/adwords-remarketing-tag/#configuring_the_global_site_tag_for_multiple_accounts)

## Check functionalities

Install [`Google Tag Assistant`](https://chrome.google.com/webstore/detail/tag-assistant-by-google/kejbdjndbnbjgmefkgdddjlbokphdefk?hl=en) and see if your page is being tracked.

## Development

Repo not actively maintained. See https://github.com/nuxt-community/gtm-module/issues/82 for future usages.

## License

[MIT License](./LICENSE)
