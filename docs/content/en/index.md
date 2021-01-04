---
title: Introduction
description: 'A simple mechanism to transform a monolithic Vue application into an application based on Micro Services architecture'
position: 1
category: ''
fullscreen: true
features:
  - Division into independent Micro Services
  - Each service can have its own business context
  - Simple communication between services
  - Services can be loaded locally to the project or hosted on a server
  - Simple expansion between services
  - Services swap
  - Overwriting mechanisms in services
  - Versioning and upgrading of services
  - Universal services for various projects
---

<p align="center">
  <a href="https://github.com/ergonode/vuems" target="_blank" rel="noopener noreferrer">
    <img src="./logo-bg.png" alt="VueMS logo with background">
  </a>
</p>

<h1 align="center">Vue Micro Services</h1>
<p align="center">A simple mechanism to transform a monolithic Nuxt application into an application based on Micro Services architecture.</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@ergonode/vuems">
    <img alt="NPM" src="https://img.shields.io/npm/v/@ergonode/vuems">
  </a>
</p>
<br>

Transform your [NuxtJS](https://nuxtjs.org) project to <b>Micro Service architecture</b> by [VueMS](https://github.com/ergonode/vuems).

## Inspiration

Combination of `Vue` and `NuxtJS` frameworks gives us the opportunity to build any web application we want.
Unfortunately, application built on this approach is monolithic and we cannot extend its behavior.<br>
Of course we can extend the project with some elements, but these are small fragments.<br>
`NuxtJS` allows for extensions from modules, plugins and other small libraries.<br>
In addition, `NuxtJS` forces developers to have a specific directory structure (page, middleware, store, etc.).
This gives us a rigid application built on specific principles.


`VueMS` gives the possibility to divide the application into micro parts that use all `Vue` + `NuxtJS` mechanisms, but do not have their limitations.<br>
Structure of these parts is identical to the monolithic application, however each service can operate separately, communicate and interact with one another.<br>
The services can have small mechanisms and very complex structures.

## Features

<list :items="features"></list>


<p class="flex items-center">Enjoy light and dark mode:&nbsp;<app-color-switcher class="inline-flex ml-2"></app-color-switcher></p>
