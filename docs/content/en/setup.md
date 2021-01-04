---
title: Setup
description: 'VueMS installation'
position: 2
category: Guide
---

Transform the [NuxtJS][nuxt] project into a Micro Service architecture✨

## Libraries

#### 📦 Requirements

- [Vue.js][vue] (v2.x)
- [Nuxt.js][nuxt] (v2.x)
- [Nuxt Router][router]

<alert type="warning">
  The project must have all the <u>required</u> libraries for <b>VueMS</b> to work properly
</alert>

#### 🚀  Power Supplies
- [Vuex][vuex] (optionally)
- [i18n][i18n] (optionally)

<alert type="info">
  The use of <u>optional</u> libraries is described <a href="/options#vuex">here</a>
</alert>

## Installation

Add `@ergonode/vuems` dependency to your project:

<code-group>
  <code-block label="NPM" active>

  ```bash
  npm install @ergonode/vuems
  ```

  </code-block>
  <code-block label="Yarn">

  ```bash
  yarn add @ergonode/vuems
  ```

  </code-block>
</code-group>

Then, add `@ergonode/vuems` to the `buildModules` section of `nuxt.config.js`:

```javascript [nuxt.config.js]
export default {
  buildModules: ['@ergonode/vuems']
}
```

## Configure

```javascript [nuxt.config.js]
  export default {
    buildModules: [
      '@ergonode/vuems'
    ],
    vuems: {
      /* module options */
    },
  }
```
<alert type="info">
  More about module options <a href="/options">here!</a>
</alert>


[vue]: https://vuejs.org
[nuxt]: https://nuxtjs.org/
[router]: https://github.com/nuxt-community/router-module
[vuex]: http://vuex.vuejs.org
[i18n]: https://i18n.nuxtjs.org/
