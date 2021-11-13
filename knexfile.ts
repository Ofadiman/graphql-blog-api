import { Knex } from 'knex'

const MILLISECONDS_CONNECTION_TIMEOUT: number = 10_000

export const knexConfig: Knex.Config = {
  // Specifies how much time must elapse before throwing an error related to exceeding the maximum timeout for creating a connection.
  acquireConnectionTimeout: MILLISECONDS_CONNECTION_TIMEOUT,
  // Saves a stack trace of the error thrown by the db driver.
  // By default, Node.js removes the stack trace if there is an `await` keyword before the function that threw the error.
  asyncStackTraces: true,
  client: `pg`,
  connection: {
    database: `postgres`,
    host: `graphql-blog-db-dev`,
    password: `postgres`,
    port: 5_432,
    user: `postgres`
  },
  // Logs all queries to the database.
  debug: true,
  migrations: {
    directory: `src/core/database/migrations`,
    tableName: `migrations`
  },
  // Specifies the minimum and maximum number of connections in a pool.
  pool: {
    max: 3,
    min: 1
  },
  seeds: {
    directory: `src/core/database/seeds`
  }
}

// eslint-disable-next-line import/no-default-export
export default knexConfig
