---
title: Modules structure
description: 'Create first modules'
position: 12
category: Cookbook
---

For the project to work properly you need to add the first modules to the structure.

## Create `modules` directory

Create an `modules` directory to keep the modules in it.

Directory should be located in the **root directory** of the project.


## Clean structure

After adding a directory, we **remove all** other directories except `layouts`, `static` and `middleware`.

<alert type="info" align="center">
      <img src="demo/image/demo-clean-structure.png" alt="Clean structure"/>
</alert>

## Create modules

In `modules` directory we create ours modules.

### Create scopes

`Scope` is a space for grouping modules.
It is useful for keeping order when publishing modules to **npm**.

For this demo we've created two scoped directories : `@example` and `@example2`.

<alert type="info" align="center">
      <img src="demo/image/demo-module-scopes.png" alt="Module scopes"/>
</alert>

### Create module directory

In `@example` scope we create `core` directory. It is our main module.

In `@example2` scope we create `about` directory. It is our support module.

The modules have a `src` directory and files that make it easier to publish the module on the **npm** server in the future.

Create a structure as in the example below.

<alert type="info" align="center">
      <img src="demo/image/demo-modules-structure.png" alt="Module structure"/>
</alert>

#### `package.json`


```json [package.json]
{
  "name": "@example/core",
  "version": "0.1.0",
  "description": "Demo core module",
  "main": "src/index.js",
  "files": [
    "src/*"
  ]
}
```

#### `README.md`

Is an helpful file with module description.
```md [README.md]
Core module
```

#### `src`
Has a module content.


[scope]: https://docs.npmjs.com/about-scopes
