---
title: Middleware
description: 'VueMS middleware'
position: 10
category: API
---

Middleware is a built-in **NuxtJS** mechanism.

When modifying the routing operation, you had to change the middleware mechanism.

Middleware will be called for every route change but it can be divided into two types.

<alert type="info">
  All about <b>VueMS</b> middleware configuration you can find <a href="/usage#add-middleware" >here</a>.
</alert>

## Global middleware
This type of middleware will be called for every route change.

To use middleware that will run globally you need to create a `middleware` directory in the module and add a file that will end with `.global.js` suffix.

Global middleware has access to the full context.

> Example path: `@Core/middleware/privilegeRoutingCheck.global.js`

<p align="center">
      <article-image src="examples/global-middleware.png" alt="Module router"/>
</p>

```javascript [@Core/middleware/privilegeRoutingCheck.global.js]
export default ({
    route, app, error, store,
}) => {
    const {
        meta: {
            privileges = [],
        },
    } = route;

    if (store.state.authentication.token
      && store.state.authentication.user) {
        if (privileges.length
            && !app.$hasAccess(privileges)) {
            error({
                statusCode: 403,
            });
        }
    }
};
```


## Local middleware
This type of middleware will be run on specific routing related with page routes.

### Helpers

**VueMS** has generated an 'routerHelper.modules' file that exports the necessary methods.
The file is generated at the start of the nuxt server and is placed in a temporary folder `.nuxt`.

> Full path `~/.nuxt/routerHelper.modules`.

#### setLocalMiddlewares()
Is a method that searches for local middleware and runs it sequentially on a specific routing.

The context transferred to the local middleware is determined by the `setLocalMiddlewares` method in the `router.js` file.

```javascript [router.js]
import Vue from 'vue';
import Router from 'vue-router';

import {
    setLocalMiddlewares,
} from '~/.nuxt/routerHelper.modules';

export function createRouter() {
    const router = new Router({...});

    router.beforeEach(
        (to, from, next) => setLocalMiddlewares({
            to,
            from,
            next,
        }),
    );

    return router;
}
```
<alert type="success">
  You can extend the contact with any information, just pass it to the <code>setLocalMiddlewares</code> method.
</alert>

### Usage

To add local middleware you need to add the appropriate entry to the routing of the page on which you want to run middleware.
You have to put it in the `meta` property as `middleware` array property.

<code-group>
  <code-block label="Definition" active>

  ```javascript [@Dashboard/middleware/auth.js]
    export default function auth ({ next, store }){
      if(!store.getters.auth.loggedIn){
          return next({
              name: 'login'
          })
      }

      return next()
    }
  ```

  </code-block>
  <code-block label="Use">

  ```javascript [@Dashboard/config/routes.js]
    import {
        Icons,
        Pages,
    } from './imports';

    import auth from '@Dashboard/middleware/auth';

    export const ROUTE_NAME = {
        DASHBOARD: 'dashboard',
    };

    export default [
        {
            name: ROUTE_NAME.DASHBOARD,
            path: '/dashboard',
            component: Pages.Dashboard,
            meta: {
                middleware: [
                    auth,
                ]
            },
        },
    ];
  ```

  </code-block>
</code-group>


---

<alert type="info">
  More about <b>NuxtJS middleware</b> can be found <a href="https://nuxtjs.org/docs/2.x/directory-structure/middleware" target="_blank" >here</a>.
</alert>
