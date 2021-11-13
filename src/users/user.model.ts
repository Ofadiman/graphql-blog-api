import { Field, Int, ObjectType } from '@nestjs/graphql'

import { Post } from '../posts/post.model'

@ObjectType({ description: `A model that represents the user of the application.` })
export class User {
  public static TABLE_NAME: string = `users`

  public static MAX_EMAIL_LENGTH: number = 255
  public static MAX_PASSWORD_LENGTH: number = 255
  public static MIN_EMAIL_LENGTH: number = 4
  public static MIN_PASSWORD_LENGTH: number = 8

  @Field((): typeof Int => Int, { description: `An identifier that identifies a unique user.` })
  public id: number

  @Field((): typeof String => String, { description: `Email address.` })
  public email: string

  @Field((): typeof String => String, { description: `Encrypted password.` })
  public password: string

  @Field((): Array<typeof Post> => [Post], { description: `Posts that were written by the selected user.` })
  public posts: Array<Post>
}
