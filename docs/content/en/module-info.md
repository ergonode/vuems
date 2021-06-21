---
title: Information
description: ''
position: 6
category: Module
---

Modules are based on mechanisms [Nuxt Modules][nuxt-modules], but they have no restrictions on the structure.

The module can have any structure, which means it can be a single functionality or a large and complex business logic. We divide modules at our discretion and it is also our decision what structure they will have.

<alert type="warning">
The most important thing is to keep the main files in the <code>src</code> directory when creating the module.

</alert>

<p align="center">
      <img src="examples/module-structure.png" alt="Module structure">
</p>

## Types

Modules can be divided into two types. The type determines the place from which the module is loaded.

- `local`: Modules placed locally in the project in the default `modules` directory. These modules are only available in the project and are fully modifiable.

<alert type="info">
  Changing the default directory for local modules: <a href="/options#modulesdir"><code>modulesDir option</code></a>
</alert>


- `npm`: Modules hosted on external servers [npm][npm]. Module is available when we install the package in the project (`npm i module-name`). <br>These modules are unmodifiable and they are updated only by upgrading the npm package version.

<alert type="info">
  Changing the directory for installed npm packages: <a href="/options#nodemodulesdir"><code>nodeModulesDir option</code></a>.
</alert>
<alert type="info">
  Changing the directory attached to the symbolic link: <a href="/options#vendordir"><code>vendorDir option</code></a>.
</alert>


## Module naming
Correct names are needed to load the modules into the **VueMS** library.

### Local
The names of local modules are determined based on the directory structure. The adopted and recommended directory structure is based on the concept [npm scope](https://docs.npmjs.com/about-scopes).
```
modules/
|-- @test/
    |-- my-local-module/
|-- users/
```

### npm
The names of the npm modules are consistent with the approach of creating npm packages.
The modules in this section must be hosted on the npm server ( [npm][npm] ) or on a local server ( [verdaccio][verdaccio] ).

<alert type="info">
  More information about <a href="https://docs.npmjs.com/packages-and-modules">npm package</a>
</alert>

#### **Example**
```javascript{}[nuxt.config.js]
export default {
  vuems: {
    modules: {
      local: [
        '@test/my-local-module',
        'users',
      ],
      npm: [
        '@npm/npm-module',
      ],
    }
  }
}
```

## Directory structure

By using the **VueMS** library we can maintain the same directory structure as in [NuxtJS][nuxt].
Looking at the module structure we can see its similarity to a typical Nuxt-based project [structure][nuxt-dirs].

If you want to change the default directory structure, you have to change it in the [VueMS options][vuems-dirs].


**Directories:**
* **assets**<br>
    The assets directory contains uncompiled assets such as your styles, images, or fonts.
* **components**<br>
    The components directory is where you put all your Vue.js components which are then imported into your pages.
* **config**<br>
    All [module configuration][doc-config] files.
* **defaults**<br>
    All module default vars.
* **layouts**<br>
    Application layouts.
* **locales**<br>
    Module i18n translations.
* **middleware**<br>
    The middleware directory contains application middleware. <br>
    Middleware lets you define custom functions that can be run before rendering either a page or a group of pages (layout).
* **mixins**<br>
    All module mixin files.
* **models**<br>
    All module models files.
* **pages**<br>
    The pages directory contains your application's views and routes.
* **plugins**<br>
    The plugins directory contains Javascript plugins that you want to run before instantiating the root Vue.js Application.
* **services**<br>
    Contains all services with API requests.
* **store**<br>
    The store directory contains Vuex Store files.<br>
    Directory with configuration under store are considered as store modules, with a name such as directory name.

<p align="center">
      <img src="examples/module-content.png" alt="i18n translations files">
</p>


[npm]: https://www.npmjs.com/
[verdaccio]: https://verdaccio.org/
[nuxt]: https://nuxtjs.org/
[nuxt-dirs]: https://nuxtjs.org/guides/get-started/directory-structure
[nuxt-modules]: https://nuxtjs.org/guide/modules/
[vuems-dirs]: /options#directories
[doc-config]: /module-config#config-directory
