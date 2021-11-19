import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'

import { PostModel } from '../posts/post.model'
import { PostsService } from '../posts/posts.service'
import { ReadOneUserArgs } from './args/read-one-user.args'
import { UserModel } from './user.model'
import { UsersService } from './users.service'

@Resolver((): typeof UserModel => UserModel)
export class UsersResolver {
  public constructor(private readonly usersService: UsersService, private readonly postsService: PostsService) {}

  @Query((): typeof UserModel => UserModel, {
    description: `The query returns the user with the selected ID.`,
    name: `user`
  })
  public async readOneUser(@Args() args: ReadOneUserArgs): Promise<UserModel> {
    return this.usersService.readOne(args)
  }

  @ResolveField(`posts`, (): [typeof PostModel] => [PostModel], {
    description: `A list of posts that have been created by the user with the selected ID.`
  })
  public async readManyPostsByUserId(@Parent() user: UserModel): Promise<Array<PostModel>> {
    return this.postsService.readAllByUserId({ id: user.id })
  }
}
