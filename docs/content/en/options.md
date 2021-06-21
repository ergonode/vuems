---
title: Options
description: 'VueMS options'
position: 4
category: Guide
---

To configure the integration, you can use `vuems` property in the `nuxt.config.js`:

```javascript [nuxt.config.js]
  export default {
    vuems: {
      // options
    },
  }
```

## `modules`

- Type: `Object`
- Default:
```javascript
  {
    npm: [],
    local: []
  }
```

One of the most important options, which determines which modules are loaded in the project.<br>

Supported options:
 - `local` - defines local modules, physically placed in the project,
 - `npm` - defines external modules, hosted on the [npm][npm] server,

<code-group>
  <code-block label="Local" active>

 ```javascript{}[nuxt.config.js]
  export default {
    vuems: {
      modules: {
          local: [
            '@demo/core',
            '@cookbook/user',
          ],
      },
    }
  }
  ```

  </code-block>
  <code-block label="Npm">

 ```javascript{}[nuxt.config.js]
  export default {
    vuems: {
      modules: {
          npm: [
            '@test/users',
            '@bleto/import'
          ],
      },
    }
  }
  ```

  </code-block>
  <code-block label="Both">

 ```javascript{}[nuxt.config.js]
  export default {
    vuems: {
      modules: {
          local: [
            '@demo/core',
            '@cookbook/user',
          ],
          npm: [
            '@test/users',
            '@bleto/import'
          ],
      },
    }
  }
  ```

  </code-block>
</code-group>

<alert type="info">
  The <b>VueMS library</b> will not start when the property is empty or not specified.
</alert>

## `required`

- Type: `Array`
- Default: `[]`

Determines the modules needed for the proper functioning of the project.

 ```javascript[nuxt.config.js]
  export default {
    vuems: {
      required: [ '@demo/core' ]
    }
  }
```

<alert type="info">
  It is not a required option but quite helpful in case of forcing a specific module to load.
</alert>


## `modulesDir`

- Type: `String`
- Default: `modules`

Determines the name of the directory for storing the local modules.


## `vendorDir`

- Type: `String`
- Default: `vendor`

Directory created by the VueMS mechanism to create symbolic links for npm modules.
Directory is temporary and used by symbolic link.


## `nodeModulesDir`

- Type: `String`
- Default: `node_modules`

Directory  where npm packages are installed.

<alert type="info">
  More information <a href="https://docs.npmjs.com/cli/v6/configuring-npm/folders" target="_blank">here</a>
</alert>


## `vuex`

- Type: `Boolean`
- Default: `false`

If **Vuex** library is used.

## `i18n`

- Type: `Array`
- Default: `[]`

If **i18n plugin** is used then set array with translations keys used in the application.

<code-group>
  <code-block label="Translation keys" active>

 ```javascript{}[nuxt.config.js]
  export default {
    vuems: {
      i18n: [
        'en_GB',
        'pl_PL',
      ],
    }
  }
  ```
  </code-block>
</code-group>

<alert type="info">
    The translator keys are closely related to the translator file names.
</alert>
<p align="center">
  <img src="examples/i18n-translations.png" alt="i18n translations files">
</p>

## `isDev`

- Type: `Boolean`
- Default: `false`

Is development mode on.

 ```javascript{}[nuxt.config.js]
  export default {
    vuems: {
      isDev: process.env.NODE_ENV !== 'production',
    }
  }
  ```

## `logLoadedModules`

- Type: `Boolean`
- Default: `false`

Log all loaded module names.

## `verbose`

- Type: `Boolean`
- Default: `true`

Show **VueMS** logs

## `directories`

- Type: `Object`
- Default:
```javascript
{
    assets: 'assets',
    components: 'components',
    config: 'config',
    layouts: 'layouts',
    locales: 'locales',
    middleware: 'middleware',
    pages: 'pages',
    plugins: 'plugins',
    services: 'services',
    store: 'store',
}
```
Directory structure for module.

<alert type="info">
  More information <a href="/module-info#directory-structure">here</a>
</alert>

# Example

 ```javascript{}[nuxt.config.js]
  export default {
    vuems: {
      required: [
          '@demo/core',
      ],
      modules: {
          local: [
            '@demo/core',
            '@cookbook/user',
          ],
          npm: [
            '@test/users',
            '@bleto/import'
          ],
      },
      vuex: true,
      i18n: [
        'en_GB',
        'pl_PL',
      ],
      logLoadedModules: true,
      isDev: process.env.NODE_ENV !== 'production',
    }
  }
  ```

[npm]: https://www.npmjs.com/
[dirs]: /module-info#directory-structure
