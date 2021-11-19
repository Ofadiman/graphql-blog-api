import { Injectable } from '@nestjs/common'

import { CommentModel } from './comment.model'
import { CommentsRepository } from './comments.repository'

@Injectable()
export class CommentsService {
  public constructor(private readonly commentsRepository: CommentsRepository) {}

  public async createOneComment(input: { content: string; postId: number; userId: number }): Promise<CommentModel> {
    return this.commentsRepository.createOne(input)
  }
}
