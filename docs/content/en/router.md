---
title: Router
description: 'VueMS router'
position: 9
category: API
---

**VueMS** uses the `@nuxtjs/router` library for simple routing management in the application.
This allows you to easily combine routing from different modules.

You need to correctly install and configure the `@nuxtjs/router` library, the user manual is [here][router-install].

<alert type="info">
  More about <b>Nuxt Router Module</b> can be found <a href="https://github.com/nuxt-community/router-module" target="_blank">here</a>.
</alert>


## Helpers

To use routing from all modules, you need to use properly prepared methods.

**VueMS** has generated an 'routerHelper.modules' file that exports the necessary methods.
The file is generated at the start of the nuxt server and is placed in a temporary folder `.nuxt`.

> Full path `~/.nuxt/routerHelper.modules`.

### extendRoutes()

A method that returns an array of routing tables that we can use.

It uses the `routerLocal` parameter, which adds additional user-specified routing to the routing table.

<alert type="info">
  The use of this method is described <a href="/usage#add-router">here</a>.
</alert>

### scrollBehavior()

The `scrollBehavior` method lets you define a custom behavior for the scroll position between the routes.
This method is called every time a page is rendered.

This is an auxiliary method used in the `router.js` file in the `createRouter` method.

 ```javascript{}[router.js]
    import Vue from 'vue';
    import Router from 'vue-router';

    import {
        extendRoutes,
        scrollBehavior,
    } from '~/.nuxt/routerHelper.modules';

    Vue.use(Router);

    export function createRouter() {
        return new Router({
            mode: 'history',
            base: '/',
            routes: extendRoutes(),
            scrollBehavior,
        });
    }
  ```

<alert type="info">
  More info about <b>Scroll Behavior</b> <a href="https://router.vuejs.org/guide/advanced/scroll-behavior.html" target="_blank">here</a>.
</alert>

## Usage

Each module has its own routing.
It must be added to the `routes.js` file of the `config` directory.

<alert type="info" align="center">
      <img src="./examples/module-router.png" alt="Module router">
</alert>

```javascript [@Dashboard/config/routes.js]
import {
    Icons,
    Pages,
} from './imports';

export const ROUTE_NAME = {
    DASHBOARD: 'dashboard',
};

export default [
    {
        name: ROUTE_NAME.DASHBOARD,
        path: '/dashboard',
        component: Pages.Dashboard,
    },
];
```

---

<alert type="info">
  Creating a routing structure is compatible with the  <a href="https://router.vuejs.org/" target="_blank"><b>Vue Router</b> library</a>.
</alert>

[router-install]: /usage#nuxtjsrouter
