import { ArgsType, Field, Int, ReturnTypeFuncValue } from '@nestjs/graphql'
import { IsArray, IsInt, IsOptional, IsPositive } from 'class-validator'

import { PostDescriptions } from '../post.descriptions'

@ArgsType()
export class PostsArgs {
  public static DESCRIPTION: string = `Arguments used to fetch a list of posts.`

  @Field((): ReturnTypeFuncValue => [Int], { description: PostDescriptions.TAG_IDS, nullable: true })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsArray()
  @IsOptional()
  public tagIds?: Array<number>
}
