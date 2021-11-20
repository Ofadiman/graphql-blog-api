import { Field, InputType, Int, ReturnTypeFuncValue } from '@nestjs/graphql'
import { IsOptional, Length } from 'class-validator'

import { PostConstraints } from '../post.constraints'
import { PostDescriptions } from '../post.descriptions'

@InputType({ description: CreateOnePostInput.DESCRIPTION })
export class CreateOnePostInput {
  public static DESCRIPTION: string = `Input used to create a post.`

  @Field((): typeof String => String, { description: PostDescriptions.TITLE })
  @Length(PostConstraints.MIN_TITLE_LENGTH, PostConstraints.MAX_TITLE_LENGTH)
  public title: string

  @Field((): typeof String => String, { description: PostDescriptions.CONTENT })
  @Length(PostConstraints.MIN_CONTENT_LENGTH, PostConstraints.MAX_CONTENT_LENGTH)
  public content: string

  @Field((): ReturnTypeFuncValue => [Int], { description: PostDescriptions.TAG_IDS, nullable: true })
  @IsOptional()
  public tagIds?: Array<number>
}
