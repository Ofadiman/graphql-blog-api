import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(`posts_tags`, (tableBuilder: Knex.TableBuilder): void => {
    tableBuilder.increments().primary()
    tableBuilder.integer(`post_id`).unsigned().references(`id`).inTable(`posts`)
    tableBuilder.integer(`tag_id`).unsigned().references(`id`).inTable(`tags`)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(`posts_tags`)
}
