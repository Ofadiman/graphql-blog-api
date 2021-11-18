import { Knex } from 'knex'

import { ProfileConstraints } from '../../profiles/profile.constraints'
import { ProfileRecord } from '../../profiles/profile.record'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(ProfileRecord.TABLE_NAME, (tableBuilder: Knex.TableBuilder): void => {
    tableBuilder.increments(`id`)
    tableBuilder.string(`bio`, ProfileConstraints.BIO_MAX_LENGTH).notNullable()
    tableBuilder.string(`photo`).notNullable()
    tableBuilder.string(`username`, ProfileConstraints.USERNAME_MAX_LENGTH).notNullable()
    tableBuilder.integer(`user_id`).references(`users.id`)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(ProfileRecord.TABLE_NAME)
}
