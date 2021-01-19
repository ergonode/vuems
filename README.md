<p align="center">
  <a href="https://www.npmjs.com/package/@ergonode/vuems" rel="noopener noreferrer">
    <img width="300" src="docs/static/logo.svg" alt="VueMS logo">
  </a>
</p>
<h1 align="center">Vue Micro Services</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/@ergonode/vuems">
    <img alt="NPM" src="https://img.shields.io/npm/v/@ergonode/vuems">
  </a>
  <a href="https://www.npmjs.com/package/@ergonode/vuems">
    <img alt="NPM" src="https://img.shields.io/npm/l/@ergonode/vuems">
  </a>
</p>
<h4 align="center"><a href="https://vuems.ergonode.com/">📖 Read the documentation</a></h4>
<br>

> A simple mechanism to transform a monolithic Vue application into an application based on Micro Services architecture.

## Inspiration

Combination of `Vue` and `NuxtJS` frameworks gives us the opportunity to build any web application we want.
Unfortunately, application built on this approach is monolithic and we cannot extend its behavior. Of course we can extend project with some elements, but these are small fragments that do not add much. In addition, `NuxtJS` forces developers to have a specific directory structure (page, middleware, store, etc.). This gives us a rigid application built on specific principles.


`VueMS` gives the possibility to divide the application into micro parts that use all `Vue` + `NuxtJS` mechanisms, but do not have their limitations. Structure of these parts is identical to the monolithic application, however each module can operate separately, communicate and interact with one another. Modules can be both small elements (single component, plugin) and complex structures (components, plugins, middleware, store, pages).

Advantages of VueMS:

- Each module can have its own business context communicating separately with the backend application.
- Modules can be turned active or inactivate anytime which allows to customize the application for each client individually.
- Modules can be loaded locally within the application and downloaded from external servers ([npm][npm], [Verdaccio][verdaccio]).
- Thanks to having modules on external servers, we can version them, therefore the modules are independent and easy to expand.
- The customer can upgrade any package or replace it with another one.

---
## Detailed Start
### 📦 Requirements

- [Vue.js][vue] (v2.x)
- [Nuxt.js][nuxt] (v2.x)
- [Nuxt Router][router]


### 🚀  Power Supplies
- [Vuex][vuex] - optionally
- [i18n][i18n] - optionally

---
## Setup

#### 1. Add `@ergonode/vuems` dependency to your project.

```bash
npm install @ergonode/vuems
# or
yarn add @ergonode/vuems
```

#### 2. Add `@ergonode/vuems` to the `buildModules` section in the `nuxt.config.js` file.

```js
  export default {
    ...
    buildModules: [
      ['@ergonode/vuems', { /* module options */ }]
    ],
    ...
  }
```

  ##### Using top level options

  ```js
  export default {
    ...
    buildModules: [
      '@ergonode/vuems'
    ],
    vuems: {
      /* module options */
    },
    ...
  }
  ```
---
## Options

### `modules`

- Type: `Object`
- Default: `{ npm:[], local: [] }`

Object with all loaded modules.

### `required`

- Type: `Array`
- Default: `[]`

Array with required module names.

### `modulesDir`

- Type: `String`
- Default: `modules`

Local modules directory name.

### `vendorDir`

- Type: `String`
- Default: `vendor`

Npm modules directory name. Directory is temporary and used by symbolic link.

### `nodeModulesDir`

- Type: `String`
- Default: `node_modules`

Directory where installed npm modules are to be found.

### `vuex`

- Type: `Boolean`
- Default: `true`

If Vuex library is used.

### `i18n`

- Type: `Boolean`
- Default: `false`

If i18n plugin is used.

### `isDev`

- Type: `Boolean`
- Default: `false`

Is development mode on.

### `logLoadedModules`

- Type: `Boolean`
- Default: `false`

Log all loaded modules.

### `verbose`

- Type: `Boolean`
- Default: `true`

Log module process.

### `directories`

- Type: `Object`
- Default:
```
{
    assets: 'assets',
    components: 'components',
    config: 'config',
    layouts: 'layouts',
    middleware: 'middleware',
    pages: 'pages',
    plugins: 'plugins',
    store: 'store',
}
```

Directory structure for module.

### Options example
```js
vuems: {
    required: [
        '@my/core',
    ],
    modules: {
        local: [
          '@my/core',
          '@my/authentication',
        ],
        npm: [
            '@test/users',
            '@test2/import'
        ]
    },
    isDev: process.env.NODE_ENV !== 'production',
}
```
---
## Module creating

### Introduction
Modules are based on mechanisms [Nuxt Modules](https://nuxtjs.org/guide/modules/), but they have no restrictions on the structure. The module can have any structure, which means it can be a single functionality or a large and complex business logic. We divide modules at our discretion and it is also our decision what structure they will have.

### Types
Modules can be divided into two types. The type determines the place from which the module is loaded.
- **local**: Modules placed locally in the project in the default `modules` directory. These modules are only available in the project and are fully modifiable.
:warning: Changing the default directory for local modules (`modulesDir` option)
- **npm**: Modules hosted on external servers (npm). Module is available when we  install the package in the project (`npm i module-name`). These modules are unmodifiable and they are updated only by upgrading the npm package version.
:warning: Changing the directory for installed npm packages (`nodeModulesDir` option).
:warning: Changing the directory attached to the symbolic link (`vendorDir` option).

### Naming modules
#### Local
The names of local modules are determined based on the directory structure. The adopted and recommended directory structure is based on the concept [npm scope](https://docs.npmjs.com/about-scopes).
```
modules/
|-- @test/
    |-- my-local-module/
|-- users/
```
#### Npm
The names of the npm modules are consistent with the approach of creating npm packages.

**Example**:
```js
modules: {
  local: [
    '@test/my-local-module',
    'users',
  ],
  npm: [
    '@npm/npm-module',
  ],
}
```

### Module requirements
Each module needs several things to work properly:

#### `index.js` entry file:

In the project directory we create an entry file called `index.js`, needed to run the module.
- `index.js` is created according to the [Nuxt Modules](https://nuxtjs.org/guide/modules/) rules,
- The default exported function must be asynchronous,
- We can add two additional functions:
  - `beforeModule()` - asynchronous function run before the module is loaded,
  - `afterModule()` - synchronous function started after the module is loaded,

```js
export async function beforeModule() {
    // run before loding module
}
export default async function () {
   // module logic
}
export async function afterModule() {
    // run after loding module
}
```

#### `config` directory:
Module must have a `config` directory with `index.js` file. All available configurations can be placed in this directory.

##### **Configurations:**
- `index.js`: Main configuration file exporting object:
  - `name`: Module name
    - Type: `String`
    - Required: `true` :warning:
  - `aliases`: Module aliases needed for easy communication between modules
    - Type: `Object`
    - Required: `true` :warning:
  - `relations`: Modules relations. Modules in this array are needed for proper module operation.
    - Type: `Array`
    - Required: `false`
  - `replacements`: Component replacements. Replace any component from any module with your own.
    - Type: `Object`
    - Required: `false`
  - `plugins`: Module plugins loaded globally.
    - Type: `Array`
    - Required: `false`
  - `css`: Module css loaded globally.
    - Type: `Array`
    - Required: `false`

  **Example:**
  ```js
  export default {
      name: '@test/core',
      aliases: {
          '@Core': '/',
      },
      replacements: {
        '@Core/components/coreComponent': '/components/myComponent',
      },
      relations: [
        '@test/messages',
      ],
      plugins: [
          { ssr: true, src: './plugins/axios' },
      ],
      css: [
          './assets/scss/reset.scss',
      ]
  };
  ```

- `routes.js`: Main routing configuration file for the module. Is closely related with [Nuxt Router](https://github.com/nuxt-community/router-module) mechanism.

  **Example**:
    ```js
    const Page = () => import('@Core/pages/settings/index').then(m => m.default || m);
    const Tab = () => import('@Core/components/tab').then(m => m.default || m);

    export default [
      {
          name: 'settings',
          path: '/settings',
          component: Page,
          children: [
              {
                  name: 'settings-main',
                  path: 'main',
                  component: Tab,
              },
          ],
      },
    ];
    ```

- `extends.js`: Mechanisms extending other modules.
  - `extendComponents`: You can extend components from one module to components from another.
    - Type: `Object`
    - Required: `false`

    **Example**:
    ```js
    // Definition
    const Navigation: () => import('@Notifications/components/Navigation');

    export default {
      extendComponents: {
        NAVIGATION_BAR: [
          {
            component: Navigation,
            props: {},
          },
        ],
      },
    };
    ```
    The global `this.$getExtendSlot()` function is used to download the component.
    ```js
    // Use in other module
    <template v-for="(component, index) in extenededComponents">
        <Component
            :is="component.component"
            :key="index"
            v-bind="component.props" />
    </template>
    <script>
    export default {
      computed: {
        extendedComponents() {
          return this.$getExtendSlot('NAVIGATION_BAR');
        },
      },
    };
    </script>
    ```
  - `extendRoutesChildren`: You can extend routing in any module.
    - Type: `Array`
    - Required: `false`

    **Example**:
    ```js
    const TestSettingsTab = () => import('@Test/components/SettingsTab').then(m => m.default || m);

    export default {
      extendRoutesChildren: [
          {
            name: 'settings', // existing router name what we want extend
            children: [ // array with router to extend
              {
                name: 'settings-test',
                path: 'test',
                component: TestSettingsTab,
              },
            ],
          }
      ];
    }
    ```
  - `dictionaries`: You can extend dictionaries.
    - Type: `Array`
    - Required: `false`

    **Example**:
    ```js
    export default {
        dictionaries: [
            {
                stateProp: 'currencies',
                dataFormat: {},
                requestPath: '/dictionary/currencies',
            },
        ]
    }
    ```
  - `extendStore`: You can extend the existing Vuex store.
    - Type: `Object`
    - Required: `false`

    **Example**:
    ```js
    const TestStore = () => import('@Test/extends/store/test');

    export default {
        extendStore: {
            Test: TestStore,
        },
    }
    ```
    If we have existing `Test` store and we want extend it.

  - `extendMethods`: You can insert any method from module
    - Type: `Object`
    - Required: `false`

    **Example**:
    ```js
    // Definition
    export default {
        extendMethods: {
            '@Test/store/test/action': () => {
                console.log('test');
            }
        },
    }
    ```
    The global `this.$getExtendMethod()` function is used for call extended methods.
    ```js
    // Use in other module
    export default {
        create({ state }) {
            ...
            this.$getExtendMethod('@Test/store/test/action');
            ...
        }
    }
    ```

## Example application

- [Ergonode](https://github.com/ergonode/frontend)


[npm]: https://verdaccio.org/
[verdaccio]: https://verdaccio.org/
[vue]: https://vuejs.org
[nuxt]: https://nuxtjs.org/
[router]: https://github.com/nuxt-community/router-module
[vuex]: http://vuex.vuejs.org
[i18n]: https://i18n.nuxtjs.org/
