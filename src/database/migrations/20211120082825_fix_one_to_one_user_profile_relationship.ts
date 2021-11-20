import { Knex } from 'knex'

import { ProfileRecord } from '../../profiles/profile.record'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(ProfileRecord.TABLE_NAME, (tableBuilder: Knex.TableBuilder): void => {
    tableBuilder.unique([`user_id`])
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(ProfileRecord.TABLE_NAME, (tableBuilder: Knex.TableBuilder): void => {
    tableBuilder.dropUnique([`user_id`])
  })
}
