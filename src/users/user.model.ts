import { Field, Int, ObjectType } from '@nestjs/graphql'

import { PostModel } from '../posts/post.model'
import { UserDescriptions } from './user.descriptions'

@ObjectType({ description: UserDescriptions.MODEL })
export class UserModel {
  @Field((): typeof Int => Int, { description: UserDescriptions.ID })
  public id: number

  @Field((): typeof String => String, { description: UserDescriptions.EMAIL })
  public email: string

  @Field((): typeof String => String, { description: UserDescriptions.PASSWORD })
  public password: string

  @Field((): Array<typeof PostModel> => [PostModel], { description: UserDescriptions.POSTS })
  public posts: Array<PostModel>

  public toSerializableObject(): Pick<UserModel, 'email' | 'id' | 'posts'> {
    return {
      email: this.email,
      id: this.id,
      posts: this.posts
    }
  }
}
