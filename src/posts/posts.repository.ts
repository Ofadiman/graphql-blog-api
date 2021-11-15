import { Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'

import { CreateOnePostInput } from './inputs/create-one-post.input'
import { Post } from './post.model'

type PostRecord = {
  content: string
  id: number
  title: string
  user_id: number
  votes: number | null
}

@Injectable()
export class PostsRepository {
  public constructor(@InjectKnex() private readonly knex: Knex) {}

  public async createOne(args: CreateOnePostInput & { userId: number }): Promise<Post> {
    const [post]: Array<PostRecord> = await this.knex
      .table<PostRecord>(Post.TABLE_NAME)
      .insert({ content: args.content, title: args.title, user_id: args.userId })
      .returning(`*`)

    return plainToClass(Post, post)
  }

  public async readMany(): Promise<Array<Post>> {
    const posts: Array<PostRecord> = await this.knex.table<PostRecord>(Post.TABLE_NAME).select(`*`)

    return posts.map((post: PostRecord): Post => {
      const { user_id, ...rest }: PostRecord = post

      return plainToClass(Post, { ...rest, userId: user_id })
    })
  }
}
