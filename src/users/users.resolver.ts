import { Args, ArgsType, Field, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { IsInt, IsPositive, Min } from 'class-validator'

import { Post } from '../posts/post.model'
import { PostsService } from '../posts/posts.service'
import { CreateOneUserInput } from './inputs/create-one-user.input'
import { User } from './user.model'
import { UsersService } from './users.service'

@ArgsType()
class ReadOneUserByIdArgs {
  @Field((): typeof Int => Int, { description: `User id.` })
  @Min(3)
  @IsInt()
  @IsPositive()
  public id: number
}

@Resolver((): typeof User => User)
export class UsersResolver {
  public constructor(private readonly usersService: UsersService, private readonly postsService: PostsService) {}

  @Mutation((): typeof User => User, { description: `A mutation that creates a user in the application.` })
  public async createOneUser(
    @Args({ description: CreateOneUserInput.DESCRIPTION, name: CreateOneUserInput.name }) input: CreateOneUserInput
  ): Promise<User> {
    return this.usersService.createOne(input)
  }

  @Query((): typeof User => User, { description: `The query returns the user with the selected ID.`, name: `user` })
  public async readOneUserById(@Args() args: ReadOneUserByIdArgs): Promise<User> {
    return this.usersService.readOneById({ id: args.id })
  }

  @ResolveField(`posts`, (): [typeof Post] => [Post], {
    description: `A list of posts that have been created by the user with the selected ID.`
  })
  public async readManyPostsByUserId(@Parent() user: User): Promise<Array<Post>> {
    return this.postsService.readAllByUserId({ id: user.id })
  }
}
