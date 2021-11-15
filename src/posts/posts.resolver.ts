import { Injectable, Scope } from '@nestjs/common'
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import DataLoader from 'dataloader'

import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { User } from '../users/user.model'
import { UsersService } from '../users/users.service'
import { CreateOnePostInput } from './inputs/create-one-post.input'
import { Post, UserInPost } from './post.model'
import { PostsService } from './posts.service'

/**
 * For some reasons, this loader cannot be in a file other than PostsResolver, otherwise the reflect-metadata library throws errors.
 */
@Injectable({ scope: Scope.REQUEST })
export class PostsLoaders {
  public constructor(private readonly usersService: UsersService) {}

  public readonly batchAuthors: DataLoader<number, User> = new DataLoader(
    async (ids: Readonly<Array<number>>): Promise<Array<Error | User>> => {
      const users: Array<User> = await this.usersService.readManyByIds(ids)

      const usersMap: Map<number, User> = new Map(users.map((user: User): [number, User] => [user.id, user]))

      return ids.map((id: number): Error | User => {
        const user: User | undefined = usersMap.get(id)
        if (user === undefined) {
          return new Error(`User with id: ${id} could not be fetched.`)
        }

        return user
      })
    }
  )
}

@Resolver((): typeof Post => Post)
export class PostsResolver {
  public constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
    private readonly postsLoaders: PostsLoaders
  ) {}

  @Mutation((): typeof Post => Post, { description: `A mutation that creates a post.` })
  public async createOnePost(
    @CurrentUser() user: User,
    @Args({ description: CreateOnePostInput.DESCRIPTION, name: CreateOnePostInput.name }) input: CreateOnePostInput
  ): Promise<Post> {
    return this.postsService.createOne({ ...input, userId: user.id })
  }

  @Query((): Array<typeof Post> => [Post], {
    description: `The query returns a list of posts according to the given criteria.`,
    name: `posts`
  })
  public async readManyPosts(): Promise<Array<Post>> {
    return this.postsService.readMany()
  }

  @ResolveField(`user`, (): typeof UserInPost => UserInPost)
  public async readUserByPostId(@Parent() post: Post): Promise<UserInPost> {
    return this.postsLoaders.batchAuthors.load(post.userId)
  }
}
