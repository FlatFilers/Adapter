# Flatfile.io CSV Importer Adapter

[![Build Status](https://travis-ci.org/flatfilers/adapter.svg?branch=master)](https://travis-ci.org/flatfilers/adapter)
[![Codecov](https://img.shields.io/codecov/c/github/flatfilers/adapter.svg)](https://codecov.io/gh/flatfilers/adapter)
[![NPM version](https://img.shields.io/npm/v/typescript-starter.svg)](https://www.npmjs.com/package/typescript-starter)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![dependencies Status](https://david-dm.org/flatfilers/adapter/status.svg)](https://david-dm.org/flatfilers/adapter)
[![devDependencies Status](https://david-dm.org/flatfilers/adapter/dev-status.svg)](https://david-dm.org/flatfilers/adapter?type=dev)


A simple event and promise driven adapter for importing CSV files.

![Preview](https://flatfile.io/img/preview.png)

> **License Key**
>
> In order to setup, you need to [create or sign in to your flatfile.io account](https://flatfile.io) and obtain a license key.

## Using NPM or Bower

If you don't like external dependencies, or you have a nice build system like Webpack in place. You can install and use Flatfile as an npm package.

```sh
npm install flatfile-csv-importer --save
```
or
```sh
bower install flatfile-csv-importer --save
```

## Quickstart
Add the following code before the ending `</body>` tag in your html.

```js

<script src="https://unpkg.com/flatfile-csv-importer/index.min.js"></script>

<script>
  var LICENSE_KEY = 'PASTE YOUR KEY HERE'

  var robotImporter = new FlatfileImporter('demo-account', {
    fields: [{
      label: 'Robot Name',
      key: 'name'
    }, {
      label: 'Shield Color',
      key: 'shield-color',
      validator: /^[a-zA-Z]+$/
    }, {
      label: 'Robot Helmet Style',
      key: 'helmet-style',
    }, {
      label: 'Call Sign',
      key: 'sign',
      alternates: ['nickname', 'wave'],
      validator: /^\w{4}$/
    }],
    type: 'Robot'
  })

  robotImporter.on('complete', function(users, meta) {
    robotImporter.displayLoader()

    setTimeout(function() {
      robotImporter.displaySuccess()
      $("#output").val(JSON.stringify(users, null, 2));
    }, 1500)
  })

  $(function() {
    $("#import-button").click(function() {
      robotImporter.open()
    })
  })

</script>
```

## ES6 / Babel

```js
import FlatfileImporter from 'flatfile-csv-importer'
import $ from 'jquery'

// configure your flatfile options here
const options = {}

// Obtain your license key from https://flatfile.io
const LICENSE_KEY = 'PASTE YOUR KEY HERE'

// initialize the importer
const importer = new FlatfileImporter(FLATFILE_LICENSE_KEY, options)

// setup your handler
const buttonClickHandler = async () => {
  try {
    const {data, meta} = await importer.load()
    await uploadYourData(data)
  } catch(e) {
    // handle a failed upload
  }

}

const uploadYourData = (data) => {
  // logic here to upload the clean data your server
}

$("#upload-button").click(buttonClickHandler)
```

## Promise Overrides
Flatfile includes a basic native compatible Promise shim for IE support. You can override this with your preferred library by using the following global setting:

```js
FlatfileImporter.Promise = Bluebird.Promise
```
