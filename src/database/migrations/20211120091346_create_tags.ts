import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(`tags`, (tableBuilder: Knex.TableBuilder): void => {
    tableBuilder.increments(`id`)
    tableBuilder.string(`name`).unique().notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(`tags`)
}
