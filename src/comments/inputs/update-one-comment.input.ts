import { Field, InputType, Int, ReturnTypeFuncValue } from '@nestjs/graphql'
import { IsPositive, IsString, Length } from 'class-validator'

import { CommentConstraints } from '../comment.constraints'
import { CommentDescriptions } from '../comment.descriptions'

@InputType({ description: UpdateOneCommentInput.DESCRIPTION })
export class UpdateOneCommentInput {
  public static DESCRIPTION: string = `Input used to update a comment.`

  @Field((): ReturnTypeFuncValue => Int, { description: CommentDescriptions.ID })
  @IsPositive()
  public id: number

  @Field((): ReturnTypeFuncValue => String, { description: CommentDescriptions.CONTENT })
  @IsString()
  @Length(CommentConstraints.MIN_CONTENT_LENGTH, CommentConstraints.MAX_CONTENT_LENGTH)
  public content: string
}
