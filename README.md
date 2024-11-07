# Turborepo starter

This is my tech-stack that I used for developing scalable application powered by Turborepo, with NestJS as back-end, tailwindcss for styling, shadcn-ui as main component, Prisma as database, and ts-rest for type-safe API.

## Using this example

Run the following command:

```sh
git clone https://github.com/cobeo2004/with-nest-prisma-ts-rest-turbo
cd with-nest-prisma-ts-rest-turbo
npm install
```

To sync the database

```sh
cd apps/api
cp .env.example .env
cd ../..
npm run db:push
npm run db:migrate
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `@repo/web`: another [Next.js](https://nextjs.org/) app
- `@repo/api`: For [NestJS](https://nestjs.com/) and [Prisma](https://prisma.io) back-end
- `@repo/api-client`: For define [ts-rest](https://ts-rest.com/) type-safe API contract shared by both `@repo/api` and `@repo/web`
- `@repo/ui`: a stub React component library shared by both `web` and other front-end on `apps` dir
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
