import { Injectable, UnauthorizedException } from '@nestjs/common'

import { UserModel } from '../users/user.model'
import { CommentModel } from './comment.model'
import { CommentsRepository } from './comments.repository'

@Injectable()
export class CommentsService {
  public constructor(private readonly commentsRepository: CommentsRepository) {}

  public async createOneComment(input: { content: string; postId: number; userId: number }): Promise<CommentModel> {
    return this.commentsRepository.createOne(input)
  }

  public async updateOneComment(args: {
    input: { content: string; id: number }
    user: UserModel
  }): Promise<CommentModel> {
    const comment: CommentModel = await this.commentsRepository.readOne({ id: args.input.id })

    const isCommentOwner: boolean = args.user.id === comment.userId
    if (!isCommentOwner) {
      throw new UnauthorizedException()
    }

    return this.commentsRepository.updateOne({ content: args.input.content, id: args.input.id })
  }
}
