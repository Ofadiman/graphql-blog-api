import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(`users`, (tableBuilder: Knex.CreateTableBuilder): void => {
    tableBuilder.increments(`id`)
    tableBuilder.string(`email`, 255).unique().notNullable()
    tableBuilder.string(`password`, 255).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(`users`)
}
