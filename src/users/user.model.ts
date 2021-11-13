import { Field, Int, ObjectType } from '@nestjs/graphql'

import { Post } from '../posts/post.model'

@ObjectType({ description: `A model that represents the user of the application.` })
export class User {
  @Field((): typeof Int => Int, { description: `An identifier that identifies a unique user.` })
  public id: number

  @Field((): typeof String => String, { description: `Email address.` })
  public email: string

  @Field((): typeof String => String, { description: `Encrypted password.` })
  public password: string

  @Field((): Array<typeof Post> => [Post], { description: `Posts that were written by the selected user.` })
  public posts: Array<Post>
}
