import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { Post } from '../posts/post.model'
import { PostsService } from '../posts/posts.service'
import { User } from './user.model'
import { UsersService } from './users.service'

@Resolver((): typeof User => User)
export class UsersResolver {
  public constructor(private readonly usersService: UsersService, private readonly postsService: PostsService) {}

  @Query((): typeof User => User, { name: `user` })
  public async readOneUserById(@Args(`id`, { type: (): typeof Int => Int }) id: number): Promise<User> {
    return this.usersService.readOneById({ id })
  }

  @ResolveField(`posts`, (): [typeof Post] => [Post])
  public async readManyPostsByUserId(@Parent() user: User): Promise<Array<Post>> {
    return this.postsService.readAllByUserId({ id: user.id })
  }
}
