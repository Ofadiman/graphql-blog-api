import { Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'

import { CommentModel } from './comment.model'
import { CommentRecord } from './comment.record'

@Injectable()
export class CommentsRepository {
  public constructor(@InjectKnex() private readonly knex: Knex) {}

  public async createOne(args: { content: string; postId: number; userId: number }): Promise<CommentModel> {
    const [commentRecord]: Array<CommentRecord> = await this.knex
      .table<CommentRecord>(CommentRecord.TABLE_NAME)
      .insert({ content: args.content, post_id: args.postId, user_id: args.userId })
      .returning(`*`)

    const { user_id, post_id, ...rest }: CommentRecord = commentRecord

    return plainToClass(CommentModel, { ...rest, postId: post_id, userId: user_id })
  }

  public async updateOne(args: { content: string; id: number }): Promise<CommentModel> {
    const [updatedComment]: Array<CommentRecord> = await this.knex
      .table<CommentRecord>(CommentRecord.TABLE_NAME)
      .update({ content: args.content })
      .where({ id: args.id })
      .returning(`*`)

    const { user_id, post_id, ...rest }: CommentRecord = updatedComment

    return plainToClass(CommentModel, { postId: post_id, userId: user_id, ...rest })
  }

  public async readOne(args: { id: number }): Promise<CommentModel> {
    const [commentRecord]: Array<CommentRecord> = await this.knex
      .table<CommentRecord>(CommentRecord.TABLE_NAME)
      .select(`*`)
      .where({ id: args.id })

    const { user_id, post_id, ...rest }: CommentRecord = commentRecord

    return plainToClass(CommentModel, { ...rest, postId: post_id, userId: user_id })
  }
}
