import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { User } from '../users/user.model'
import { CreateOnePostInput } from './inputs/create-one-post.input'
import { Post } from './post.model'
import { PostsService } from './posts.service'

@Resolver()
export class PostsResolver {
  public constructor(private readonly postsService: PostsService) {}

  @Mutation((): typeof Post => Post, { description: `A mutation that creates a post.` })
  public async createOnePost(
    @CurrentUser() user: User,
    @Args({ description: CreateOnePostInput.DESCRIPTION, name: CreateOnePostInput.name }) input: CreateOnePostInput
  ): Promise<Post> {
    return this.postsService.createOne({ ...input, userId: user.id })
  }
}
