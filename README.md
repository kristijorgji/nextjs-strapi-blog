# nextjs-strapi-blog

This is a project that aims to create a blog site like Wordpress by using NextJS and Strapi.

It is relying on the responses returned by my other [Strapi project](https://github.com/kristijorgji/strapi-blog-cms) adjusted for blog cms usage.

The project uses statically export when running `yarn build` and everything is created only in build-time.

After `yarn build` run `npx serve@latest out` to see your blog.

If you want to use it by running next server, change next.config.js and remove output: 'export',

## Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Test production build locally

```bash
yarn build
```

then serve the generated static files via serve library

```bash
npx serve@latest out
```

## Build and deploy

```bash
yarn build
```

then copy the `out` folder to your favorite hosting server, s3, or a web server.
