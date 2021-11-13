import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(`posts`, (tableBuilder: Knex.CreateTableBuilder): void => {
    tableBuilder.increments(`id`)
    tableBuilder.string(`title`, 255).unique().notNullable()
    tableBuilder.string(`content`, 1_000).notNullable()
    tableBuilder.integer(`votes`).nullable()
    tableBuilder.integer(`user_id`).references(`users.id`)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(`posts`)
}
