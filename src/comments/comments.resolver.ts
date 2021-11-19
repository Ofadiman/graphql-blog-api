import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { UserModel } from '../users/user.model'
import { CommentModel } from './comment.model'
import { CommentsService } from './comments.service'
import { CreateOneCommentInput } from './inputs/create-one-comment.input'

@Resolver((): typeof CommentModel => CommentModel)
export class CommentsResolver {
  public constructor(private readonly commentsService: CommentsService) {}

  @Mutation((): typeof CommentModel => CommentModel, { description: `A mutation that creates a comment.` })
  public async createOneComment(
    @CurrentUser() user: UserModel,
    @Args({ description: CreateOneCommentInput.DESCRIPTION, name: CreateOneCommentInput.name })
    input: CreateOneCommentInput
  ): Promise<CommentModel> {
    return this.commentsService.createOneComment({ ...input, userId: user.id })
  }
}
