# nextjs-strapi-blog

This is a project that aims to create a blog site like Wordpress by using NextJS and Strapi.

It is relying on the responses returned by my other [Strapi project](https://github.com/kristijorgji/strapi-blog-cms) adjusted for blog cms usage.

The project uses statically export when running `yarn build` and everything is created only in build-time.

After `yarn build` run `yarn serve` which uses `npx serve@latest out` to see your blog.

If you want to use it by running next server, change next.config.js and remove output: 'export',

## Getting started

First get my [Strapi Blog Cms Project](https://github.com/kristijorgji/strapi-blog-cms)

Afterward clone or download this project and execute `yarn install`

Then
`cp .env.example .env`

and fill inside the proper credentials especially `STRAPI_API_TOKEN`

Now you are ready to fly fast with by [building and serving the blog](#build-and-deploy)

## Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## How to customise the UI

The provided ui is only functional.

The user is meant to develop and customise it to their own wishes by adjusting `src/c/components` `React` components and styles.

Feel free to build "themes" and make pr in this repository.

## Test production build locally

```bash
yarn build
```

then serve the generated static files by running

```bash
yarn serve
```

## Build and deploy

```bash
yarn build
```

then copy the `out` folder to your favorite hosting server, s3, or a web server.

## Contributing

Feel free to raise PRs and contribute to this repository.

At the time of the writing on 14 July 2023 it uses the last NextJS and Strapi versions so it is worth maintaining and developing further.
