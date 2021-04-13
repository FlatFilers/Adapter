# Flatfile.io CSV Importer Adapter

[![Build Status](https://travis-ci.org/FlatFilers/Adapter.svg?branch=master)](https://travis-ci.org/FlatFilers/Adapter)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![dependencies Status](https://img.shields.io/david/FlatFilers/adapter)](https://david-dm.org/FlatFilers/adapter)
[![devDependencies Status](https://img.shields.io/david/dev/FlatFilers/adapter)](https://david-dm.org/FlatFilers/adapter?type=dev)


A simple adapter for elegantly importing data (CSV, XLS & more) via [flatfile.io](https://www.flatfile.io) (Typescript, ES6, Browser)

_*Important note:*_ While the below info is a basic way to get up and running, we recommend reading the developer docs &rarr; https://flatfile.io/developers/javascript/getting-started

_*Another note:*_ If you are using Angular or React, we have specific packages for those. Chck out our [React package on GitHub](https://github.com/FlatFilers/react-adapter). Check out our [Angular package on GitHub](https://github.com/FlatFilers/angular-adapter).

> **License Key**
>
> In order to setup, you need to [create or sign in to your flatfile.io account](https://flatfile.io) and obtain a license key.

## Using NPM

If you don't like external dependencies, or you have a nice build system like Webpack in place. You can install and use Flatfile as an npm package.

```sh
npm i @flatfile/adapter --save
```


## Using CDN

The latest version of the package is available via CDN so you can just drop it into your website and start using it.

```sh
https://unpkg.com/@flatfile/adapter/build/dist/index.min.js
```

## Quickstart
Add the following code before the ending `</body>` tag in your html.

```html
<script src="https://unpkg.com/@flatfile/adapter/build/dist/index.min.js"></script>

<script>
  const LICENSE_KEY = '00000000-0000-0000-0000-000000000000' // replace this with your license key

  const importer = new FlatfileImporter(LICENSE_KEY, {
    type: 'Robot',
    fields: [
      {
        label: 'Name',
        key: 'name',
        validators: [ { validate: 'unique' } ]
      },
      {
        label: 'Phone',
        key: 'phone',
        alternates: ['number', 'tel'],
        validators: [
          {
            validate: 'regex_matches',
            regex: '^\d{10}$'
          }
        ]
      },
      {
        label: 'Country',
        key: 'country',
        type: 'select',
        options: [
          { value: 'US', label: 'United States' },
          { value: 'CA', label: 'Canada' }
        ]
      }
    ]
  })

  // More info: https://flatfile.io/developers/javascript/getting-started/#the-basics
  importer.setCustomer({
    userId: '1'
  })

  importer.requestDataFromUser().then((results) => {
    importer.displayLoader('Please wait while your data is loading')

    // do something with your data
    setTimeout(() => {
      // console.log(results)

      importer.displaySuccess('You are all done!')
    }, 1000)
  })
</script>
```

## ES6 / Babel

```js
const LICENSE_KEY = '00000000-0000-0000-0000-000000000000' // replace this with your license key

const importer = new FlatfileImporter(LICENSE_KEY, {
  type: 'Robot',
  fields: [
    {
      label: 'Name',
      key: 'name'
    }
  ]
})

// More info: https://flatfile.io/developers/javascript/getting-started/#the-basics
importer.setCustomer({
  userId: '1'
})

document.querySelector('button').addEventListener('click', async () => {
  try{
    const results = await importer.requestDataFromUser()

    importer.displayLoader('Please wait while your data is loading')

    // do something with your data
    setTimeout(() => {
      // console.log(results)

      importer.displaySuccess('You are all done!')
    }, 1000)
  }catch(e){
    // handle a failed upload
  }
})
```

## Data hooks
Flatfile's Data Hooks are a useful data healing element to re-format, validate and/or correct data automatically during the import without the user having to correct manually.

More information: [Getting started with Data Hooks](https://flatfile.io/developers/javascript/datahooks)

```js
const importer = new FlatfileImporter(LICENSE_KEY, {
  type: 'Robot',
  fields: [
    {
      label: 'Name',
      key: 'name'
    }
  ]
})

importer.setCustomer({
  userId: '1'
})

// adding a data hook that will add 'Jr.' to the name in each row
importer.registerRecordHook((row) => {
  // Example row: {name: 'John'}
  const result = {};

  if (row.name) {
    result.name = {
      value: `${row.name} Jr.`
    };
  }

  return result;
});
```

## Themes
Theming gives you independent control over the look and feel of Flatfile Portal. With this, you can adjust both a global styles and individual components within the importer, as well as control the CSS pseudo-class :hover & :focus on buttons.

More information: [Custom Themes for Flatfile Portal](https://flatfile.io/developers/javascript/themes)

```js
const importer = new FlatfileImporter(LICENSE_KEY, {
  type: 'Robot',
  fields: [
    {
      label: 'Name',
      key: 'name'
    }
  ],
  theme: {
    global: {
      backgroundColor: '#212327',
      textColor: '#c2c3c3',
      primaryTextColor: '#c2c3c3',
      secondaryTextColor: '#c2c3c3',
      successColor: '#c2c3c3',
      warningColor: '#c2c3c3'
    },
    // other keys below
  }
})
```

## Promise Overrides
Flatfile includes a basic native compatible Promise shim for IE support. You can override this with your preferred library by using the following global setting:

```js
FlatfileImporter.Promise = Bluebird.Promise
```
