# Overview

This repository is created as part of [RealWorld](https://github.com/gothinkster/realworld) using [Redwood](https://redwoodjs.com/) which is an open-source, full-stack web framework.

# How to run this repository

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then start the development server:

```
yarn redwood dev
```

Your browser should automatically open to http://localhost:8910.



# About Redwood

Redwood relies on the following techniques:

- [React](https://reactjs.org/)

  A JavaScript library for building user interfaces.

- [GraphQL](https://graphql.org/)

  GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

- [Prisma](https://www.prisma.io/)

  Redwood uses [Prisma](https://www.prisma.io/), a next-gen Node.js and TypeScript ORM, to talk to the database. Prisma's schema offers a declarative way of defining your app's data models. And Prisma [Migrate](https://www.prisma.io/migrate) uses that schema to make database migrations hassle-free:

  ```
  yarn rw prisma migrate dev
  ```

- [Storybook](https://storybook.js.org/)

  Redwood integrates Storybook so that you can work on design without worrying about data.
  Mockup, build, and verify your React components, even in complete isolation from the backend:

  ```
  yarn rw storybook
  ```

- [Jest](https://jestjs.io/)

  Redwood fully integrates Jest with the front and the backends and makes it easy to keep your whole app covered by generating test files with all your components and services:

  ```
  yarn rw test
  ```
