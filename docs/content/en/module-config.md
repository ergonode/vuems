---
title: Configuration
description: ''
position: 7
category: Module
---

Each module needs several things to work properly.

## `index.js`

In the project directory we create an entry file called `index.js`, needed to run the module.

> It is **required** file.

- `index.js` is created according to the [Nuxt Modules](https://nuxtjs.org/guide/modules/) rules,
- The default exported function must be asynchronous,
- We can add two additional functions:
  - `beforeModule()` - asynchronous function run before the module is loaded,
  - `afterModule()` - asynchronous function started after the module is loaded,

```javascript [index.js]
  export async function beforeModule() {
      // run before loading module
  }
  export default async function () {
    // module logic
  }
  export async function afterModule() {
      // run after loading module
  }
```
<alert type="info">
  File is <b>required</b> and it is enough if it will have default functions without content.
</alert>


## `config` directory:

The greatest advantage of modules based on the **VueMS** library is their advanced expandability.
Each module contains a directory `config` in which all configurations related to this module can be found.

The most important configuration file is `index.js`, which contains everything you need to load the module correctly.
All other files are optional and depend on the purpose of the module.
Some of the files kept in the `config` directory are just help files to keep order and structure in code.


### Main configuration

The main configuration is placed in the `config/index.js` file.
The file exports the properties needed to correctly configure the module.

> It is **required** file.

#### Properties:

---

* **`name`**
  - Type: `String`
  - **Required: `true`**

Module name including scope, used for correct module loading. The file path is built on its base.

<alert type="info">
  For more information about naming the modules <a href="/module-info#module-naming">here</a>.
</alert>

---

* **`order`**
  - Type: `Number`
  - Required: `false`
  - Default: `1000`

The sequence of loading modules in the application. This may be important when the modules have a relationship with each other.

If the default value is not set to `1000`, the modules will be loaded at the **end**.

<alert type="info">
  The modules have a set decimal value (e.g. <code>order: 20</code>).
</alert>

---

* **`aliases`**
  - Type: `Object`
  - **Required: `true`**

The main mechanism of **communication** between the modules.

By specifying the alias, we create a name by which we will referencing the resources of this module.

<code-group>
  <code-block label="Definition" active>

  ```javascript{}[config/index.js]
    export default {
      ...
      aliases: {
          '@Core': '/',
          '@CoreComponents': '/components',
      },
    };
  ```

  </code-block>
  <code-block label="Use">

  ```javascript{}[components/example.vue]
    import List from '@Core/components/List/List';
    //or
    import List from '@CoreComponents/List/List';
  ```

  </code-block>
</code-group>

<alert type="info">
  We can create <b>any number</b> of aliases, referring to different places in the module.
</alert>

---

* **`relations`**
  - Type: `Array`
  - Required: `false`

If the modules are linked to each other, the names of the linked modules must be given here.

```javascript{}[config/index.js]
export default {
    ...
    relations: [
        '@ergonode/attributes',
        '@ergonode/media',
    ],
};
```

<alert type="info">
  When the module is in this section and is not loaded, <b>VueMS</b> will return a reference error.
</alert>

---

* **`replacements`**
  - Type: `Object`
  - Required: `false`

It defines the elements of the module that will be replaced by others. <br>
Simple mechanism of mapping elements to be replaced with a new element.


```javascript{}[config/index.js]
export default {
    ...
    replacements: {
      '@Core/components/coreComponent': '/components/myComponent',
    },
};
```
<alert type="info">
  The item to be replaced can <b>be any file and must exist</b> in the application.
</alert>

---

* **`plugins`**
  - Type: `Array`
  - Required: `false`

It defines the plugins that are loaded globally into the application.


```javascript{}[config/index.js]
export default {
    ...
     plugins: [
        {
            ssr: true,
            src: './plugins/axios',
        },
     ],
};
```
<alert type="info">
  The <code>ssr</code> flag is set when you want the plugin to be loaded at server startup. <br>

- <code>ssr: false</code> === <code>mode: 'client'</code>
- <code>ssr: true</code> === <code>mode: 'server'</code>

</alert>

---

* **`css`**
  - Type: `Array`
  - Required: `false`

Defines css styles that are defined globally for the entire application.

```javascript
export default {
    ...
    css: [
        './assets/scss/reset.scss',
        './assets/scss/font-inter-ui.scss',
    ],
};
```
<alert type="info">
  More information <a href="https://nuxtjs.org/api/configuration-css/" target="_blank">here</a>.
</alert>

**Example:**
```javascript [config/index.js]
  export default {
      name: '@test/core',
      order: 10,
      aliases: {
          '@Core': '/',
      },
      relations: [
        '@test/messages',
      ],
      replacements: {
        '@Test/components/coreComponent': '/components/myComponent',
      },
      plugins: [
          { ssr: true, src: './plugins/axios' },
      ],
      css: [
          './assets/scss/reset.scss',
      ]
  };
  ```

### Routing

File required if the module has pages and wants to define its own routing. <br>
If the routing exists, **you must create** a file named `routes.js` and put all the routing rules in it.<br>

Information from this file determines the routing passed to the [`@nuxtjs/router`](https://github.com/nuxt-community/router-module) library,<br>
which overwrites the default Nuxt routing.<br>

The **array** exported in the file is parsed and combined by the **VueMS** and passed <br>
to the main configuration of `new Router()`.


```javascript [@Core/config/routes.js]
import {
    Icons,
    Pages,
    Tabs,
} from './imports';
import Privileges from './privileges';

export const ROUTE_NAME = {
    SETTINGS_UNITS: 'settings-units',
    SETTINGS_UNIT_EDIT: 'unit-id',
    SETTINGS_UNIT_EDIT_GENERAL: 'unit-id-general',
};

export default [
    {
        name: ROUTE_NAME.SETTINGS_UNIT_EDIT,
        path: '/settings/units/unit/:id',
        component: Pages.UnitEdit,
        redirect: {
            name: ROUTE_NAME.SETTINGS_UNIT_EDIT_GENERAL,
        },
        meta: {
            isMenu: false,
        },
        children: [
            {
                name: ROUTE_NAME.SETTINGS_UNIT_EDIT_GENERAL,
                path: 'general',
                component: Tabs.UnitGeneralTab,
                meta: {
                    title: 'Options',
                    breadcrumbs: [
                        {
                            title: 'System',
                            icon: Icons.Settings,
                        },
                        {
                            title: 'Units',
                            routeName: ROUTE_NAME.SETTINGS_UNITS,
                        },
                    ],
                    privileges: [],
                },
            },
        ],
    },
];
```
<alert type="info">
  <a href="/module-config#helpers">Here</a> are described <code>privileges.js</code> and <code>imports.js</code> files.
</alert>



### Extend

Creating new modules is not all we usually need.
Sometimes you need to replace certain elements or add some to already existing solutions.

In order not to modify existing modules, **VueMS library** provides a solution to easily extend already existing mechanisms.
Thanks to it we have a lot of possibilities to extend modules from other modules.

In order to add any extensions you need to create an `extend.js` file
and use specific properties in it depending on what you want to achieve.


<alert type="info">
  You don't need to create an <code>extend.js</code>  file if you don't want to extend anything
</alert>

#### Properties:

---

* `extendRoutesChildren`
    - Type: `Array`

This functionality allows you to add a new children to a routing page.
The mechanism is based on routing and extends existing routing.

**`extendRoutesChildren`:**<br>
    - `name` - existing router name what we want extend,<br>
    - `children` - array with router to extend,<br>


```javascript [@Products/config/extends.js]
export default {
    extendRoutesChildren: [
        {
            name: 'product-id',
            children: [
                {
                    name: 'product-id-variants',
                    path: 'variants',
                    component: Tabs.ProductVariantsTab,
                    meta: {
                        title: 'Variants',
                        visible: false,
                        breadcrumbs: [
                            {
                                title: 'Products',
                                icon: Icons.Product,
                            },
                            {
                                title: 'Catalog',
                                routeName: 'catalog-products',
                            },
                        ],
                        privileges: [],
                    },
                },
            ],
        },
    ],
};
```

<alert type="info">
  The extended routing <b>must exist</b>, if it does not have the <code>children</code> property then it will be added.
</alert>

---

* `extendStore`
    - Type: `Object`

A mechanism to expand existing [**Vuex store**](https://vuex.vuejs.org/).
If there is a need to extend an already existing **Vuex store** then you should use this property.

When using `extendStore`, the **key** is the name of the existing Vuex store
and the **value** is the file that exports the content of the extended methods.

> Vuex store runs on [vuex modules](https://vuex.vuejs.org/guide/modules.html) mechanism.


```javascript [@Products/config/extends.js]
export default {
    extendStore: {
        product: () => import('@Products/extends/store/product').then(m => m.default || m),
    },
};
```

<alert type="info">
  If you want to expand the <a href="https://vuex.vuejs.org/" target="_blank">Vuex store</a>, you should place it in a different directory than the <code>store</code>.
  We recommend that you use the <code>extends</code> directory.
</alert>

<p align="center">
      <article-image src="examples/extend-vuex.png" alt="Extend vuex store" />
</p>

<alert type="warning">
  If you create the <code>store</code> directory on the module root and place a <a href="https://vuex.vuejs.org/" target="_blank">Vuex store</a> with an existing name in it, it will be replaced (The order of loading the modules is important).
</alert>

---

* `extendComponents`
    - Type: `Object`

One of the important mechanisms is the possibility of **extending existing components** from outside.
The operation of the components allows them to be reusable and used anywhere,
but the problem is when we want to extend an existing component in a specific business context.
Therefore, we have prepared a mechanism that allows you to easily **inject** a component into a specific location.

The component expansion mechanism works similarly to the placeholder placed in the text,
the placeholder is replaced by the data passed on to it. Our component expansion mechanism works the same way,
with the appropriate placeholders scattered throughout the application, which can be referenced and passed on to the component.

There are predefined places ready for expansion throughout the application.

  **Example**:

<code-group>
  <code-block label="Definition" active>

  ```javascript{}[config/extends.js]
    const Navigation: () => import('@Notifications/components/Navigation');

    export default {
      extendComponents: {
        NAVIGATION_BAR: [
          {
            component: Navigation,
            props: {
              propsToSend: true,
            },
          },
        ],
      },
    };
  ```

  </code-block>
  <code-block label="Use">

  ```html{}[components/Extends.vue]
    <template v-for="(component, index) in extendedComponents">
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

  </code-block>
</code-group>

<alert type="info">
  Placeholder names are defined by the access path to the component <br>
  (e.g <code>@Products/components/Forms/ProductForm</code> - extend product form component).
  We recommend this approach because it is very clear.
</alert>

<alert type="info">
  There is a global <code>$getExtendSlot</code> method in the application that takes all the components
  passed for expansion and places them in a prepared place.
</alert>

---

* `extendMethods`
  - Type: `Object`

The mechanism works the same as `extendComponents`, but instead of the components the placeholders are filled with methods.

The methods can return information or just set up some data.

The methods can take any parameters, it depends on the information provided while creating the placeholder.

**Example:**

<code-group>
  <code-block label="Definition" active>

  ```javascript{}[@ExtendStore/config/extends.js]
    export default {
        extendMethods: {
            '@Test/store/test/action': ({
                $this, data = [],
            }) => {
                console.log({$this, data});
                return data;
            }
        },
    }
  ```

  </code-block>
  <code-block label="Use">

  ```javascript{}[@Test/store/test/action]
    export default {
        create({ state }) {
            ...
            this.$getExtendMethod('@Test/store/test/action');
            ...
        }
    }
  ```

  </code-block>
</code-group>

<alert type="info">
  There is a global <code>$getExtendMethod</code> method in the application that takes all the methods
  passed for expansion and places them in a prepared place.
</alert>

<alert type="info">
  The methods work in <b>asynchronous</b> mode.
</alert>


### Helpers

Support files are files that are not imposed by **VueMS**, they are to make your work easier. <br>


* `privileges.js`
A file storing all permissions imposed by the module. Used mainly in routing - `routes.js`.

```javascript
export default {
    SETTINGS: {
        namespace: 'SETTINGS',
        create: 'SETTINGS_CREATE',
        read: 'SETTINGS_READ',
        update: 'SETTINGS_UPDATE',
        delete: 'SETTINGS_DELETE',
    },
};
```

* `imports.js`
A file storing all imports needed in the configuration files.

```javascript
export const Pages = {
    Login: () => import('@Core/pages/login/index').then(m => m.default || m),
};

export const Tabs = {
    MainSettingsTab: () => import('@Core/components/Tabs/MainSettingsTab').then(m => m.default || m),
};
```

<alert type="info">
  Of course, if you want, you can create your own support files. The <code>config</code> directory is used for this.
</alert>


[vuems]: https://www.npmjs.com/package/@ergonode/vuems
[vuems-conf]: https://www.npmjs.com/package/@ergonode/vuems#config-directory
[vuex-module]: https://vuex.vuejs.org/guide/modules.html
[nuxt-css]: https://nuxtjs.org/api/configuration-css/
[nuxt-router]: https://github.com/nuxt-community/router-module
