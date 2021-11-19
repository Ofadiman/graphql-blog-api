import { Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'

import { CreateOnePostInput } from './inputs/create-one-post.input'
import { PostModel } from './post.model'
import { PostRecord } from './post.record'

@Injectable()
export class PostsRepository {
  public constructor(@InjectKnex() private readonly knex: Knex) {}

  public async createOne(args: CreateOnePostInput & { userId: number }): Promise<PostModel> {
    const [post]: Array<PostRecord> = await this.knex
      .table<PostRecord>(PostRecord.TABLE_NAME)
      .insert({ content: args.content, title: args.title, user_id: args.userId })
      .returning(`*`)

    const { user_id, ...rest }: PostRecord = post

    return plainToClass(PostModel, { ...rest, userId: user_id })
  }

  public async readMany(): Promise<Array<PostModel>> {
    const posts: Array<PostRecord> = await this.knex.table<PostRecord>(PostRecord.TABLE_NAME).select(`*`)

    return posts.map((post: PostRecord): PostModel => {
      const { user_id, ...rest }: PostRecord = post

      return plainToClass(PostModel, { ...rest, userId: user_id })
    })
  }
}
