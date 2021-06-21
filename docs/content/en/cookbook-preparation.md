---
title: Preparation
description: 'Preparation demo'
position: 11
category: Cookbook
---

The **demo** will show the creation of a simple repository based on **NuxtJS**,
which will be transformed into a Micro Service architecture using **VueMS**.

<alert type="info">
  A full installation of the respirator you can see in <a href="https://github.com/ergonode/vuems-demo" target="_blank">this place</a>.
</alert>


## Create clean NuxtJS project

To build a **demo** we use the ready [CLI NuxtJS][nuxt-cli] library to build applications.


### Using `create-nuxt-app`

```bash
  npx create-nuxt-app vuems-demo
```
<video playsinline controls muted>
  <source src="demo/video/nuxt-install-process.mov" type="video/mp4" />
</video>

### Launch project

<video playsinline controls muted>
  <source src="demo/video/nuxt-server-start.mov" type="video/mp4" />
</video>

**Preview**
<img src="demo/image/demo-start.png" alt="Start demo">

**Project start up structure**
<p align="center">
      <img src="demo/image/demo-structure-init.png" alt="Init directory structure"/>
</p>

## Install required libraries

If we already have a working application, we can start installing **VueMS**.

### VueMS

```bash
  npm install @ergonode/vuems
```

Load module and set first configuration.

```javascript [nuxt.config.js]
  export default {
    buildModules: [
      ...
      '@ergonode/vuems'
    ],
    vuems: {
      logLoadedModules: true,
    },
  }
```
<alert type="info">
  For the time being, we don't need any other <b>VueMS</b> settings, we will set them in the next steps.
</alert>


### Router

We need to install `@nuxtjs/router` to make **VueMS** work properly.


```bash
  npm install --save-dev @nuxtjs/router
```

Load module.

```javascript [nuxt.config.js]
  export default {
    buildModules: [
      ...
      '@nuxtjs/router',
    ],
  }
```

Create `router.js` file.

```javascript [router.js]
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    routes: [],
    fallback: false,
  })
}
```

<alert type="warning">
  At this point our application <b>does not have routing</b>.

  Loading the <code>~/.nuxt/routerHelper.modules</code> file is not possible now because we do not have any module added so the file does not exist yet.
</alert>


[nuxt-cli]: https://nuxtjs.org/docs/2.x/get-started/installation
