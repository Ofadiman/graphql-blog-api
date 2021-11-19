import { Knex } from 'knex'

import { CommentConstraints } from '../../comments/comment.constraints'
import { CommentRecord } from '../../comments/comment.record'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(CommentRecord.TABLE_NAME, (tableBuilder: Knex.TableBuilder): void => {
    tableBuilder.increments(`id`)
    tableBuilder.string(`content`, CommentConstraints.MAX_CONTENT_LENGTH)
    tableBuilder.integer(`post_id`).references(`posts.id`)
    tableBuilder.integer(`user_id`).references(`users.id`)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(CommentRecord.TABLE_NAME)
}
