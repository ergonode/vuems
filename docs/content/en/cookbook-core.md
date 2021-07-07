---
title: Core module
description: 'Create Core module'
position: 13
category: Cookbook
---

The `Core` module will supervise every other module.

> All files to be added are located in the `src` directory.

<p align="center">
      <article-image src="demo/image/demo-core-module.png" alt="Core module"/>
</p>

## Initiate file

First you need to create an [initialization file](/module-config#indexjs).

```javascript [@Core/index.js]
  export default async function () {}
```
> The function is empty because we do not run any additional mechanisms before this module.

## Configuration

We create a `config` directory and in it we create an `index.js` file that contains all the configurations.


> More information about [configuration](/module-config#main-configuration).

### `name`
Set the name of the module. The name should match the directory structure.
```javascript
  name: '@example/core',
```

### `order`
Specify the order in which the module is loaded. The smaller the value, the earlier the module is loaded.
```javascript
  order: 10,
```

### `aliases`
Specifies the alias to refer to in other modules.
It is needed for easy communication between modules

```javascript
  aliases: {
    '@Core': '/',
  },
```

#### Example:

```javascript [@Core/config/index.js]
  export default {
    name: '@example/core',
    order: 10,
    aliases: {
      '@Core': '/',
    },
  }
```

## Register module

After creating the module, we now need to add it to the **VueMS** configuration.
Registration is done in the **VueMS** configuration in the `nuxt.config.js` file.

We add the name of our module in the `modules` property.
Our first module is a required module, so we also add the module name to the `required` property.

```javascript [nuxt.config.js]
  export default {
    vuems: {
      modules: {
        local: ['@example/core'],
      },
      required: ['@example/core'],
      logLoadedModules: true,
    },
  }
```

## Component

Create the first components in `components` directory.

### `Logo.vue`
Create a `Logo.vue` file in `component` directory.


<alert type="warning">

  I am not presenting a full example of the `Logo.vue` component because it contains the `svg` file content.

  If you want to see the full content of the component, you can find it in the
  <a href="https://github.com/ergonode/vuems-demo" target="_blank">repository</a>.

</alert>

```vue [@Core/components/Logo.vue]
<template>
  <svg> ... </svg>
</template>

<script>
export default {
  name: 'Logo',
}
</script>

<style>
.VuemsLogo {
  animation: 1s appear;
  margin: auto;
  width: 300px;
}
@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
```

### `Wrapper.vue`
Create a `Wrapper.vue` file in `component` directory.
The component will wrap other components.

```vue [@Core/components/Wrapper.vue]
<template>
  <div class="wrapper">
    <Logo />
    <slot />
  </div>
</template>

<script>
import Logo from '@Core/components/Logo'

export default {
  name: 'Wrapper',
  components: {
    Logo,
  },
}
</script>

<style>
.wrapper {
  margin: 0 auto;
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
```

### `Navigation.vue`
Create a `Navigation.vue` file in `component` directory.
The component will be used in the layout component.

```vue [@Core/components/Navigation.vue]
<template>
  <nav class="navigation">
    <ul>
      <li><NuxtLink class="button--green" to="/">Home page</NuxtLink></li>
      <li><NuxtLink class="button--grey" to="/about">About</NuxtLink></li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'Navigation',
}
</script>

<style>
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.navigation {
  position: absolute;
  padding-top: 15px;
}

.navigation ul {
  list-style: none;
  display: flex;
  flex-direction: row;
}
</style>

```

## Page

The next thing is to add a new page.
We create a `pages` directory where we add the page.

In the new page component, we add our previously created `Wrapper` component.

```vue [@Core/pages/index/index.vue]
<template>
  <Wrapper>
    <h1 class="title">VueMS-demo</h1>
  </Wrapper>
</template>

<script>
import Wrapper from '@Core/components/Wrapper'

export default {
  name: 'IndexPage',
  components: {
    Wrapper,
  },
}
</script>
<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>

```

## Router

For the page we created in the previous step to work, we need to add routing to it.

To do this we add the `routes.js` file in the `config` directory.

> More information [here](/module-config#routing)

```javascript [@Core/config/routes.js]
import { Pages } from './imports'

export const ROUTE_NAME = {
  INDEX: 'index',
}

export default [
  {
    name: ROUTE_NAME.INDEX,
    path: '/',
    component: Pages.Index,
  },
]
```

To keep things organized, we add a helper file for importing components.
In the `config` directory, add the `imports.js` file.

```javascript [@Core/config/imports.js]
export const Pages = {
  Index: () => import('@Core/pages/index').then((m) => m.default || m),
}
```

## Layout

To give the module control over the layout and not to interfere with a file outside the module: `layouts/default.vue`.
It is best to create a layout wrapper that will be maintained in one of the modules.

In the `@Core` module, add the `layouts` directory and create the `default.vue` layout wrapper there.

```vue [@Core/layouts/default.vue]
<template>
  <div class="main">
    <Navigation />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  components: {
    Navigation: () => import('@Core/components/Navigation'),
  },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
```

#### Use layout component

We use the layout component in the nuxt layout file: `layouts/default.vue`.
```vue [layouts/default.vue]
<template>
  <DefaultLayout>
    <Nuxt />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@Core/layouts/default'

export default {
  name: 'NuxtDefaultLayout',
  components: {
    DefaultLayout,
  },
}
</script>

```
