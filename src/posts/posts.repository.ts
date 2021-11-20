import { Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'

import { CreateOnePostInput } from './inputs/create-one-post.input'
import { PostModel } from './post.model'
import { PostRecord } from './post.record'

type PostTagRelationship = {
  post_id: number
  tag_id: number
}

@Injectable()
export class PostsRepository {
  public constructor(@InjectKnex() private readonly knex: Knex) {}

  public async createOne(args: CreateOnePostInput & { userId: number }): Promise<PostModel> {
    const transaction: Knex.Transaction = await this.knex.transaction({ isolationLevel: `serializable` })

    const [post]: Array<PostRecord> = await transaction
      .table<PostRecord>(PostRecord.TABLE_NAME)
      .insert({ content: args.content, title: args.title, user_id: args.userId })
      .returning(`*`)

    if (args.tagIds !== undefined) {
      const relationships: Array<PostTagRelationship> = args.tagIds.map((tagId: number): PostTagRelationship => {
        return {
          post_id: post.id,
          tag_id: tagId
        }
      })

      await transaction.table<PostTagRelationship>(`posts_tags`).insert(relationships)
    }

    await transaction.commit()

    const { user_id, ...rest }: PostRecord = post

    return plainToClass(PostModel, { ...rest, userId: user_id })
  }

  public async readOne(args: { id: number }): Promise<PostModel> {
    const [postRecord]: Array<PostRecord> = await this.knex
      .table<PostRecord>(PostRecord.TABLE_NAME)
      .select(`*`)
      .where({ id: args.id })

    const { user_id, ...rest }: PostRecord = postRecord

    return plainToClass(PostModel, { ...rest, userId: user_id })
  }

  public async updateOne(args: { content?: string; id: number; title?: string }): Promise<PostModel> {
    const [postRecord]: Array<PostRecord> = await this.knex
      .table<PostRecord>(PostRecord.TABLE_NAME)
      .update({ content: args.content, title: args.title })
      .where({ id: args.id })
      .returning(`*`)

    const { user_id, ...rest }: PostRecord = postRecord

    return plainToClass(PostModel, { userId: user_id, ...rest })
  }

  public async readMany(): Promise<Array<PostModel>> {
    const posts: Array<PostRecord> = await this.knex.table<PostRecord>(PostRecord.TABLE_NAME).select(`*`)

    return posts.map((post: PostRecord): PostModel => {
      const { user_id, ...rest }: PostRecord = post

      return plainToClass(PostModel, { ...rest, userId: user_id })
    })
  }
}
