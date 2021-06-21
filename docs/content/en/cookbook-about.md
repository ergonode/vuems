---
title: About module
description: 'Create About module'
position: 14
category: Cookbook
---

The second module will be called `About`.

> All files to be added are located in the `src` directory.

<p align="center">
      <img src="demo/image/demo-about-module.png" alt="About module"/>
</p>

## Initiate file

First you need to create an [initialization file](/module-config#indexjs).

```javascript [@About/index.js]
  export default async function () {}
```
> The function is empty because we do not run any additional mechanisms before this module.

## Configuration

We create a `config` directory and in it we create an `index.js` file that contains all the configurations.


> More information about [configuration](/module-config#main-configuration).

### `name`
Set the name of the module. The name should match the directory structure.
```javascript
  name: '@example2/about',
```

### `order`
Specify the order in which the module is loaded. The smaller the value, the earlier the module is loaded.
```javascript
  order: 20,
```

### `aliases`
Specifies the alias to refer to in other modules.
It is needed for easy communication between modules

```javascript
  aliases: {
    '@About': '/',
  },
```

#### Example:

```javascript [@About/config/index.js]
  export default {
    name: '@example2/about',
    order: 20,
    aliases: {
      '@About': '/',
    },
  }
```

## Register module

After creating the module, we now need to add it to the **VueMS** configuration.
Registration is done in the **VueMS** configuration in the `nuxt.config.js` file.

Add the module name to the configuration.

```javascript [nuxt.config.js]
  export default {
    vuems: {
      modules: {
        local: ['@example/core', '@example2/about'],
      },
      required: ['@example/core'],
      logLoadedModules: true,
    },
  }
```

## Component

Create the first components in `components` directory.

### `About.vue`
Create a `About.vue` file in `component` directory.

```vue [@About/components/About.vue]
<template>
  <span class="subtitle">It's me</span>
</template>

<script>
export default {
  name: 'About',
}
</script>
```

## Page

The next thing is to add a new page.
We create a `pages` directory where we add the page.

In the new page component, we add our previously created `Wrapper` component.

```vue [@About/pages/about/index.vue]
<template>
  <Wrapper>
    <h1 class="title">About</h1>
    <About />
  </Wrapper>
</template>

<script>
import Wrapper from '@Core/components/Wrapper'
import About from '@About/components/About'

export default {
  name: 'AboutPage',
  components: {
    Wrapper,
    About,
  },
}
</script>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 60px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>

```

## Router

For the page we created in the previous step to work, we need to add routing to it.

To do this we add the `routes.js` file in the `config` directory.

> More information [here](/module-config#routing)

```javascript [@About/config/routes.js]
import { Pages } from './imports'

export const ROUTE_NAME = {
  ABOUT: 'about',
}

export default [
  {
    name: ROUTE_NAME.ABOUT,
    path: '/about',
    component: Pages.About,
  },
]
```

To keep things organized, we add a helper file for importing components.
In the `config` directory, add the `imports.js` file.

```javascript [@About/config/imports.js]
export const Pages = {
  About: () => import('@About/pages/about').then((m) => m.default || m),
}
```
