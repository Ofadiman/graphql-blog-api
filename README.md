# Blog API

An app that allows users to create blog posts.

## Objectives

- [x] Learn GraphQL.
  - [x] How to combine GraphQL with NestJS.
  - [x] What are [resolvers](https://docs.nestjs.com/graphql/resolvers).
  - [x] What are [mutations](https://docs.nestjs.com/graphql/mutations).
  - [x] What are [subscriptions](https://docs.nestjs.com/graphql/subscriptions).
  - [x] What are [scalars](https://docs.nestjs.com/graphql/scalars).
  - [x] What are [directives](https://docs.nestjs.com/graphql/directives).
  - [x] What are [plugins](https://docs.nestjs.com/graphql/plugins).
  - [x] What are [field middlewares](https://docs.nestjs.com/graphql/field-middleware) and how to use the with `Code First Approach`.
  - [x] What is the `Code First Approach` and how to use it to document the schema.
  - [x] What is `data loader` and how to avoid the `N+1 problem`.
  - [x] What is schema [federation](https://docs.nestjs.com/graphql/federation) and how to use it.
- [x] Learn [knex](https://www.npmjs.com/package/knex) library basics.
  - [x] How to create entities.
  - [x] How to create SQL relationships (one to one, one to many, many to many).
  - [x] How to create database migrations.
  - [x] How to create database seeds.

## Entities

- `User` - Users play a key role in the application. Each person who wants to use the application must create an account. The created account is used for user authentication and authorization purposes, as well as to create relationships with other entities in the application.
- `Profile` - Each user has a profile created at the time of account creation. The profile is used for presentation purposes and is responsible for showing more details about the user in the application.
- `Post` - Any user in the app can create posts. Posts are visible by all users and are the heart of the app.
- `Comments` - Each post can have comments added to it. Comment can only be created by logged-in user.
- `Tags` - Post authors have the ability to add tags so that app users can more easily search for posts of interest.

## User stories

Functionalities that are available in the application.

- **Authentication/Authorization**
  - [x] As a user, I can register an account.
  - [x] As a user, I can log in.
- **Profiles**
  - [x] As a user, I have a default profile assigned on account creation.
  - [x] As a user, I can update my profile (e.g. change username, change profile picture).
- **Posts**
  - [x] As a user, I can create a post.
  - [x] As a user, I can update the post I created.
  - [x] as a user, I can read posts by tags.
- **Comments**
  - [x] As a user, I can create a comment.
  - [x] As a user, I can update the comment I created.
- **Tags**
  - [x] As a user, I can create a tag.
  - [x] As a user, I can tag a post.

## Architecture

There are 3 layers in the application, which are `resolvers`, `services` and `repositories`.

- `Resolvers` are responsible for handling GraphQL queries. This is where the correctness of the query is validated, and the format of the returned response is defined.
- `Services` are responsible for executing business logic. This is where, for example, we are checking whether the user can perform an action.
- `Repositories` are responsible for reading and writing data to the database.

## Terminology

- A class with the `Args` ending (`.args.ts` file suffix) denotes the arguments to the GraphQL query.
- A class with the `Constraints` ending (`.constraints.ts` file suffix) denotes an object that encapsulates constant values used when validating an incoming payload during query or mutation.
- A class with the `Description` ending (`.description.ts` file suffix) denotes an object that encapsulates GraphQL schema descriptions.
- A class with the `Exception` ending (`.exception.ts` file suffix) denotes an exception that can be thrown in an application.
- A class with the `Input` ending (`.input.ts` file suffix) denotes the arguments to the GraphQL mutation.
- A class with the `Model` ending (`.model.ts` file suffix) denotes a business model used in the application on which additional methods are available to perform business logic.
- A class with the `Record` ending (`.record.ts` file suffix) denotes an entity stored in the database.
- A class with the `Response` ending (`.response.ts` file suffix) denotes the response type of GraphQL query or mutation.

## Notes

Various types of notes that are made during the development of the project.

### Creating `One To One` relationship with knex.

To create a one-to-one relationship where one **user** can only have one **profile**, first create the `users` table.

```ts
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(`users`, (tableBuilder: Knex.CreateTableBuilder): void => {
    tableBuilder.increments(`id`)
    tableBuilder.string(`email`, 255).unique().notNullable()
  })
}
```

This migration creates the `users` table that:

- Contains the `id` column which is automatically marked as the [primary key](https://www.postgresqltutorial.com/postgresql-primary-key/).
- Contains the `email` column of type string that can be a maximum of 255 characters long, has a `UNIQUE INDEX` created, and cannot take a `NULL` value.

Now you need to create a `profiles` table.

```ts
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(`profiles`, (tableBuilder: Knex.TableBuilder): void => {
    tableBuilder.increments(`id`)
    tableBuilder.string(`photo`).notNullable()
    tableBuilder.integer(`user_id`).unique().references(`users.id`)
  })
}
```

This migration creates the `profiles` table that:

- Contains the `id` column which is automatically marked as the [primary key](https://www.postgresqltutorial.com/postgresql-primary-key/).
- Contains the `photo` column which is an arbitrary column that is used to store urls to profile pictures.
- Contains the `user_id` column which is a reference to the `id` column in `users` table. This allows you to perform a query with `JOIN` statement. To ensure that a user can only have one profile, the `user_id` column has a `UNIQUE INDEX` that will throw an error if we want to assign 2 profiles to one user.

### Creating `One To Many` relationship with knex.

To create a one-to-many relationship where one **user** can be the author of many **posts**, first create the `users` table.

```ts
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(`users`, (tableBuilder: Knex.CreateTableBuilder): void => {
    tableBuilder.increments(`id`)
    tableBuilder.string(`email`, 255).unique().notNullable()
  })
}
```

This migration creates the `users` table that:

- Contains the `id` column which is automatically marked as the [primary key](https://www.postgresqltutorial.com/postgresql-primary-key/).
- Contains the `email` column of type string that can be a maximum of 255 characters long, has a `UNIQUE INDEX` created, and cannot take a `NULL` value.

Now you need to create a `posts` table.

```ts
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(`posts`, (tableBuilder: Knex.CreateTableBuilder): void => {
    tableBuilder.increments(`id`)
    tableBuilder.string(`title`).unique().notNullable()
    tableBuilder.string(`content`).notNullable()
    tableBuilder.integer(`user_id`).references(`users.id`)
  })
}
```

This migration creates the `posts` table that:

- Contains the `id` column which is automatically marked as the [primary key](https://www.postgresqltutorial.com/postgresql-primary-key/).
- Contains the `title` column which is an arbitrary column that is used to store post title. It has a `UNIQUE INDEX` which assures that there cannot be 2 posts with the same title in the database. The column cannot take `NULL` value due to `.notNullable()` constraint.
- Contains the `content` column which is an arbitrary column that is used to store post content.
- Contains the `user_id` column which is a reference to the `id` column in `users` table. This allows you to perform a query with `JOIN` statement. **Important** fact to notice here is that there is no `UNIQUE INDEX` constraint which allows to create many post records that reference the same `user_id`.

### Creating `Many To Many` relationship with knex.

To create a many-to-many relationship where one **post** can have many tags, and one **tag** can be assigned to many posts at the same time, first create the `posts` table.

```ts
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(`posts`, (tableBuilder: Knex.CreateTableBuilder): void => {
    tableBuilder.increments(`id`)
    tableBuilder.string(`title`).unique().notNullable()
    tableBuilder.string(`content`).notNullable()
  })
}
```

This migration creates the `posts` table that:

- Contains the `id` column which is automatically marked as the [primary key](https://www.postgresqltutorial.com/postgresql-primary-key/).
- Contains the `title` column which is an arbitrary column that is used to store post title. It has a `UNIQUE INDEX` which assures that there cannot be 2 posts with the same title in the database. The column cannot take `NULL` value due to `.notNullable()` constraint.
- Contains the `content` column which is an arbitrary column that is used to store post content.

Now you need to create a `tags` table.

```ts
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(`tags`, (tableBuilder: Knex.TableBuilder): void => {
    tableBuilder.increments(`id`)
    tableBuilder.string(`name`).unique().notNullable()
  })
}
```

This migration creates the `tags` table that:

- Contains the `id` column which is automatically marked as the [primary key](https://www.postgresqltutorial.com/postgresql-primary-key/).
- Contains the `name` column which is an arbitrary column that is used to store tag name. It has a `UNIQUE INDEX` which assures that there cannot be 2 posts with the same title in the database. The column cannot take `NULL` value due to `.notNullable()` constraint.

Once you have created both tables, it is time to create a relationship between them.

```ts
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(`posts_tags`, (tableBuilder: Knex.TableBuilder): void => {
    tableBuilder.increments().primary()
    tableBuilder.integer(`post_id`).unsigned().references(`id`).inTable(`posts`)
    tableBuilder.integer(`tag_id`).unsigned().references(`id`).inTable(`tags`)
  })
}
```

This migration creates the `posts_tags` table that:

- Contains the `post_id` column which references the `id` column in the `posts` table.
- Contains the `tag_id` column which references the `id` column in the `tags` table.

This "proxy" table allows you to store the relationship between `posts` and `tags` in your application.

### The N+1 problem

The `N+1` problem is a situation when our application makes many queries to the database that look exactly **the same**. A typical example of this problem is an application where a user can create posts, and we provide an API where the application client can retrieve a list of posts along with the authors. The `N+1` problem can appear when we try to fetch nested, related data (e.g. a list of posts with authors).

```graphql
query Posts {
  posts {
    title
    id
    content
    author {
      email
      id
    }
  }
}
```

If we try to retrieve 20 posts, while they are all written by the same user, and the resolver responsible for `author` field is performing a `SELECT` statement based on `author_id` from `post` entity, we will run the same query 20 times (1 time for each post).

There are 2 potential ways of solving the `N+1` problem. Both approaches have their pros and cons, so you should determine for yourself which approach is more appropriate for your particular case. To read more about particular implementation check out [this blog post](https://wanago.io/2021/02/08/api-nestjs-n-1-problem-graphql/).

#### Data loader

Dataloader is a class/function that is designed to fetch records in batches (i.e. using `IN` statements). You can use [dataloader](https://www.npmjs.com/package/dataloader) library.

- **Pros**
  - Decreased CPU usage on the database server when the client application does not need data from nested relationship (we do not perform unnecessary `JOIN` operation).
  - Decreased cost when the client application does not need data from nested relationship (we send less data over the wire, and cloud providers typically charge for network usage).
  - Decreased response time when the client application does not need data from nested relationship (we do not perform unnecessary `JOIN` operation).
- **Cons**
  - Increased response when the client application needs data from nested relationship (we must run 2 separate database queries).

#### `JOIN` statement

A `JOIN` statement is a database operation that allows you to retrieve related records. To read more about `JOIN` statements check out [postgresqltutorial](https://www.postgresqltutorial.com/postgresql-joins/).

- **Pros**
  - Decreased response time when the client application needs data from nested relationship (we are already running `JOIN` operation in a single query).
- **Cons**
  - Increased CPU usage on the database server when the client application does not need data from nested relationship (we are running unnecessary `JOIN` operation).
  - Increased cost when the client application does not need data from nested relationship (we send more data over the wire, and cloud providers typically charge for network usage).
  - Increased response time when the client application does not need data from nested relationship (we are running unnecessary `JOIN` operation).

### Subscriptions

Subscriptions allow you to listen to events that are happening in the application in real time. Usually, subscriptions in GraphQL are implemented with WebSockets. To learn more about subscriptions read [this post](https://wanago.io/2021/02/15/api-nestjs-real-time-graphql-subscriptions/) describing how they work and how they are used in NestJS, or refer to the [framework's official documentation](https://docs.nestjs.com/graphql/subscriptions).

