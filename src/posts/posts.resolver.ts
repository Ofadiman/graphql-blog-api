import { Injectable, Scope } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import DataLoader from 'dataloader'

import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { UserModel } from '../users/user.model'
import { UsersService } from '../users/users.service'
import { PostsArgs } from './args/posts.args'
import { CreateOnePostInput } from './inputs/create-one-post.input'
import { UpdateOnePostInput } from './inputs/update-one-post.input'
import { PostModel, UserInPost } from './post.model'
import { PostsService } from './posts.service'

/**
 * For some reasons, this loader cannot be in a file other than PostsResolver, otherwise the reflect-metadata library throws errors.
 */
@Injectable({ scope: Scope.REQUEST })
export class PostsLoaders {
  public constructor(private readonly usersService: UsersService) {}

  public readonly batchAuthors: DataLoader<number, UserModel> = new DataLoader(
    async (ids: Readonly<Array<number>>): Promise<Array<Error | UserModel>> => {
      const users: Array<UserModel> = await this.usersService.readManyByIds(ids)

      const usersMap: Map<number, UserModel> = new Map(
        users.map((user: UserModel): [number, UserModel] => [user.id, user])
      )

      return ids.map((id: number): Error | UserModel => {
        const user: UserModel | undefined = usersMap.get(id)
        if (user === undefined) {
          return new Error(`User with id: ${id} could not be fetched.`)
        }

        return user
      })
    }
  )
}

@Resolver((): typeof PostModel => PostModel)
export class PostsResolver {
  public constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
    private readonly postsLoaders: PostsLoaders
  ) {}

  @Mutation((): typeof PostModel => PostModel, { description: `A mutation that creates a post.` })
  public async createOnePost(
    @CurrentUser() user: UserModel,
    @Args({ description: CreateOnePostInput.DESCRIPTION, name: CreateOnePostInput.name }) input: CreateOnePostInput
  ): Promise<PostModel> {
    return this.postsService.createOne({ ...input, userId: user.id })
  }

  @Mutation((): typeof PostModel => PostModel, { description: `A mutation that updates a post.` })
  public async updateOnePost(
    @CurrentUser() user: UserModel,
    @Args({ description: UpdateOnePostInput.DESCRIPTION, name: UpdateOnePostInput.name }) input: UpdateOnePostInput
  ): Promise<PostModel> {
    return this.postsService.updateOne({ input, user })
  }

  @Query((): Array<typeof PostModel> => [PostModel], {
    description: `The query returns a list of posts according to the given criteria.`
  })
  public async posts(@Args({ nullable: true }) args: PostsArgs): Promise<Array<PostModel>> {
    return this.postsService.readMany({ tagIds: args.tagIds })
  }

  @ResolveField(`user`, (): typeof UserInPost => UserInPost)
  public async readUserByPostId(@Parent() post: PostModel): Promise<UserInPost> {
    return this.postsLoaders.batchAuthors.load(post.userId)
  }
}
