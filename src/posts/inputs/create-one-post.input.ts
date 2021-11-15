import { Field, InputType } from '@nestjs/graphql'
import { Length } from 'class-validator'

import { Post } from '../post.model'

@InputType({ description: `Input used to create a post.` })
export class CreateOnePostInput {
  public static DESCRIPTION: string = `Input used to create a post.`

  @Field((): typeof String => String, { description: Post.TITLE_DESCRIPTION })
  @Length(Post.MIN_TITLE_LENGTH, Post.MAX_TITLE_LENGTH)
  public title: string

  @Field((): typeof String => String, { description: Post.TITLE_DESCRIPTION })
  @Length(Post.MIN_CONTENT_LENGTH, Post.MAX_CONTENT_LENGTH)
  public content: string
}
