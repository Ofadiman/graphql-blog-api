import { Args, Field, InputType, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { Post } from '../posts/post.model'
import { PostsService } from '../posts/posts.service'
import { User } from './user.model'
import { UsersService } from './users.service'

@InputType()
export class UpvotePostArgs {
  @Field({ description: `The ID of the post to be updated.` })
  public id: number
}

@Resolver((): typeof User => User)
export class UsersResolver {
  public constructor(private readonly usersService: UsersService, private readonly postsService: PostsService) {}

  @Query((): typeof User => User, { description: `The query returns the user with the selected ID.`, name: `user` })
  public async readOneUserById(@Args(`id`, { type: (): typeof Int => Int }) id: number): Promise<User> {
    return this.usersService.readOneById({ id })
  }

  @ResolveField(`posts`, (): [typeof Post] => [Post], {
    description: `A list of posts that have been created by the user with the selected ID.`
  })
  public async readManyPostsByUserId(@Parent() user: User): Promise<Array<Post>> {
    return this.postsService.readAllByUserId({ id: user.id })
  }

  @Mutation((): typeof Post => Post)
  public async upvotePost(@Args(UpvotePostArgs.name) upvotePostArgs: UpvotePostArgs): Promise<Post> {
    return {
      content: `Happiness doesn’t qabalistic gain any lover — but the thing is what shines.`,
      id: upvotePostArgs.id,
      title: `test`,
      votes: 1
    }
  }
}
