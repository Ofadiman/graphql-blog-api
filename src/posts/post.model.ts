import { Field, Int, ObjectType, PickType } from '@nestjs/graphql'

import { User } from '../users/user.model'

@ObjectType()
export class UserInPost extends PickType(User, [`id`, `email`]) {}

@ObjectType({ description: `A model that represents posts added by a user.` })
export class Post {
  public static TABLE_NAME: string = `posts`

  public static MAX_TITLE_LENGTH: number = 255
  public static MIN_TITLE_LENGTH: number = 4

  public static MAX_CONTENT_LENGTH: number = 2_000
  public static MIN_CONTENT_LENGTH: number = 20

  public static CONTENT_DESCRIPTION: string = `Post content. The user can write anything they want in the post.`
  public static ID_DESCRIPTION: string = `An identifier that identifies a unique user.`
  public static TITLE_DESCRIPTION: string = `Post title. The post title is unique across the application.`
  public static VOTES_DESCRIPTION: string = `The number of votes that were cast for the selected post by the users of the application.`

  @Field((): typeof Int => Int, { description: Post.ID_DESCRIPTION })
  public id: number

  @Field((): typeof String => String, { description: Post.TITLE_DESCRIPTION })
  public title: string

  @Field((): typeof String => String, {
    description: Post.CONTENT_DESCRIPTION
  })
  public content: string

  @Field((): typeof Int => Int, {
    description: Post.VOTES_DESCRIPTION,
    nullable: true
  })
  public votes?: number

  @Field((): typeof UserInPost => UserInPost)
  public user: UserInPost

  @Field((): typeof Int => Int)
  public userId: number
}
