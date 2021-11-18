# Blog API

An app that allows users to create blog posts.

## Objectives

- [ ] Learn GraphQL.
  - [ ] How to combine GraphQL with NestJS.
  - [ ] What are [resolvers](https://docs.nestjs.com/graphql/resolvers).
  - [ ] What are [mutations](https://docs.nestjs.com/graphql/mutations).
  - [ ] What are [subscriptions](https://docs.nestjs.com/graphql/subscriptions).
  - [ ] What are [scalars](https://docs.nestjs.com/graphql/scalars).
  - [ ] What are [directives](https://docs.nestjs.com/graphql/directives).
  - [ ] What are [plugins](https://docs.nestjs.com/graphql/plugins).
  - [ ] What are [field middlewares](https://docs.nestjs.com/graphql/field-middleware) and how to use the with `Code First Approach`.
  - [ ] What is the `Code First Approach` and how to use it to document the schema.
  - [ ] What is `data loader` and how to avoid the `N+1 problem`.
  - [ ] What is schema [federation](https://docs.nestjs.com/graphql/federation) and how to use it.
- [ ] Learn [knex](https://www.npmjs.com/package/knex) library basics.
  - [ ] How to create entities.
  - [ ] How to create SQL relationships (one to one, one to many, many to many).
  - [ ] How to create database migrations.
  - [ ] How to create database seeds.

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
  - [ ] As a user, I can update my profile (e.g. change username, change profile picture).
- **Posts**
  - [ ] As a user, I can create a post.
  - [ ] As a user, I can update the post I created.
  - [ ] as a user, I can read posts by tags.
- **Comments**
  - [ ] As a user, I can create a comment.
  - [ ] As a user, I can update the comment I created.
- **Tags**
  - [ ] As a user, create a tag.
  - [ ] As a user, I can tag a post.
