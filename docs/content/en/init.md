---
title: Init module
description: 'VueMS init module'
position: 8
category: API
---

Init module is the main module file that is started when mounting the module.

The `index.js` file is responsible for initiating the module and properly load the module

<alert type="info">
  More about <b>init modules file</b> can be found <a href="/module-config#indexjs">here</a>.
</alert>


The mechanism can be useful when you want to load some libraries or by plugging some mechanism under a specific module.

### Example:

Using the [`@nuxtjs/style-resources`](https://github.com/nuxt-community/style-resources-module) library in a single module.

#### Load module


```bash
  npm i @nuxtjs/style-resources
```

```javascript{}[nuxt.config.js]
export default {
  modules: {
    '@nuxtjs/style-resources',
  }
}
```

#### Use

<code-group>
  <code-block label="index.js" active>

  ```javascript{}[index.js]
    import {
        join,
    } from 'path';

    import configuration from './config';

    export default async function ({
        allModules,
    }) {
        const {
            name,
            styleResources = {},
        } = configuration;

        if (!this.options.styleResources) {
            this.options.styleResources = {};
        }

        Object.keys(styleResources).forEach((resource) => {
            this.options.styleResources[resource] = join(
                allModules.find(m => m.name === name).path,
                styleResources[resource],
            ).replace(/\/$/g, '');
        });
    }
  ```

  </code-block>
  <code-block label="config/index.js">

  ```javascript{}[config/index.js]
    export default {
        name: '@ergonode/ui',
        order: 5,
        aliases: {
            '@UI': '/',
        },
        css: [
            './assets/scss/reset.scss',
            './assets/scss/font-inter-ui.scss',
        ],
        styleResources: {
            scss: './assets/scss/main.scss',
        },
    };
  ```

  </code-block>
</code-group>
