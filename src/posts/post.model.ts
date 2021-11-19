import { Field, Int, ObjectType, PickType } from '@nestjs/graphql'

import { UserModel } from '../users/user.model'
import { PostDescriptions } from './post.descriptions'

@ObjectType()
export class UserInPost extends PickType(UserModel, [`id`, `email`]) {}

@ObjectType({ description: PostDescriptions.MODEL })
export class PostModel {
  @Field((): typeof Int => Int, { description: PostDescriptions.ID })
  public id: number

  @Field((): typeof String => String, { description: PostDescriptions.TITLE })
  public title: string

  @Field((): typeof String => String, {
    description: PostDescriptions.CONTENT
  })
  public content: string

  @Field((): typeof Int => Int, {
    description: PostDescriptions.VOTES,
    nullable: true
  })
  public votes?: number

  @Field((): typeof Int => Int)
  public userId: number
}
