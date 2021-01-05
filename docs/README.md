# vuems

## Setup

Install dependencies:

```bash
npm run install
```

## Development

```bash
npm run dev
```

## Static Generation

This will create the `dist/` directory for publishing to static hosting:

```bash
npm run generate
```

To preview the static generated app, run `npm run start`


## Deploy on github pages

All changes in the documentation will be built in the `dist/` directory and the directory is published on `docs` branch.
Github pages catches an update and updates the documentation page.

```bash
npm run generate
npm run deploy
```


For detailed explanation on how things work, checkout [nuxt/content](https://content.nuxtjs.org) and [@nuxt/content theme docs](https://content.nuxtjs.org/themes-docs).
