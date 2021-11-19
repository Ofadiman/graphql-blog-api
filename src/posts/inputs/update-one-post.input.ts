import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsPositive, IsString, Length } from 'class-validator'

import { PostConstraints } from '../post.constraints'
import { PostDescriptions } from '../post.descriptions'

@InputType({ description: UpdateOnePostInput.DESCRIPTION })
export class UpdateOnePostInput {
  public static DESCRIPTION: string = `Input used to update a post.`

  @Field((): typeof Int => Int, { description: PostDescriptions.ID })
  @IsInt()
  @IsPositive()
  public postId: number

  @Field((): typeof String => String, { description: PostDescriptions.CONTENT, nullable: true })
  @IsString()
  @Length(PostConstraints.MIN_CONTENT_LENGTH, PostConstraints.MAX_CONTENT_LENGTH)
  @IsOptional()
  public content?: string

  @Field((): typeof String => String, { description: PostDescriptions.TITLE, nullable: true })
  @IsString()
  @Length(PostConstraints.MIN_TITLE_LENGTH, PostConstraints.MAX_TITLE_LENGTH)
  @IsOptional()
  public title?: string
}
