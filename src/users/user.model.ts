import { Field, Int, ObjectType } from '@nestjs/graphql'

import { Post } from '../posts/post.model'

@ObjectType({ description: `A model that represents the user of the application.`, isAbstract: true })
export class User {
  public static TABLE_NAME: string = `users`

  public static MAX_EMAIL_LENGTH: number = 255
  public static MAX_PASSWORD_LENGTH: number = 255
  public static MIN_EMAIL_LENGTH: number = 4
  public static MIN_PASSWORD_LENGTH: number = 8

  public static ID_DESCRIPTION: string = `An identifier that identifies a unique user.`
  public static EMAIL_DESCRIPTION: string = `E-mail address.`
  public static PASSWORD_DESCRIPTION: string = `User Password.`
  public static POSTS_DESCRIPTION: string = `Posts that were written by the selected user.`

  @Field((): typeof Int => Int, { description: User.ID_DESCRIPTION })
  public id: number

  @Field((): typeof String => String, { description: User.EMAIL_DESCRIPTION })
  public email: string

  @Field((): typeof String => String, { description: User.PASSWORD_DESCRIPTION })
  public password: string

  @Field((): Array<typeof Post> => [Post], { description: User.POSTS_DESCRIPTION })
  public posts: Array<Post>
}
