import { Field, Int, ObjectType } from '@nestjs/graphql'

import { Post } from '../posts/post.model'

@ObjectType({ description: `A model that represents the user of the application.` })
export class User {
  @Field((): typeof Int => Int, { description: `An identifier that identifies a unique user.` })
  public id: number

  @Field((): Array<typeof Post> => [Post], { description: `Posts that were written by the selected user.` })
  public posts: Array<Post>
}
