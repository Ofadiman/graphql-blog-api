import { Field, Int, ObjectType } from '@nestjs/graphql'

import { CommentDescriptions } from './comment.descriptions'

@ObjectType({ description: CommentDescriptions.MODEL })
export class CommentModel {
  @Field((): typeof Int => Int, { description: CommentDescriptions.ID })
  public id: number

  @Field((): typeof String => String, { description: CommentDescriptions.CONTENT })
  public content: string

  @Field((): typeof Int => Int, { description: CommentDescriptions.USER_ID })
  public userId: number

  @Field((): typeof Int => Int, { description: CommentDescriptions.POST_ID })
  public postId: number
}
