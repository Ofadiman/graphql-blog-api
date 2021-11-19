import { Field, InputType, Int, ReturnTypeFuncValue } from '@nestjs/graphql'
import { IsPositive, IsString, Length } from 'class-validator'

import { CommentConstraints } from '../comment.constraints'
import { CommentDescriptions } from '../comment.descriptions'

@InputType({ description: CreateOneCommentInput.DESCRIPTION })
export class CreateOneCommentInput {
  public static DESCRIPTION: string = `Input used to create a comment.`

  @Field((): ReturnTypeFuncValue => Int, { description: CommentDescriptions.POST_ID })
  @IsPositive()
  public postId: number

  @Field((): ReturnTypeFuncValue => String, { description: CommentDescriptions.CONTENT })
  @IsString()
  @Length(CommentConstraints.MIN_CONTENT_LENGTH, CommentConstraints.MAX_CONTENT_LENGTH)
  public content: string
}
