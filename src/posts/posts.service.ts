import { Injectable, UnauthorizedException } from '@nestjs/common'

import { UserModel } from '../users/user.model'
import { CreateOnePostInput } from './inputs/create-one-post.input'
import { UpdateOnePostInput } from './inputs/update-one-post.input'
import { PostModel } from './post.model'
import { PostsRepository } from './posts.repository'

export type ReadAllByUserIdArgs = {
  id: number
}

type UpdateOneArgs = {
  input: UpdateOnePostInput
  user: UserModel
}

@Injectable()
export class PostsService {
  public constructor(private readonly postsRepository: PostsRepository) {}

  public async createOne(input: CreateOnePostInput & { userId: number }): Promise<PostModel> {
    return this.postsRepository.createOne(input)
  }

  public async updateOne(args: UpdateOneArgs): Promise<PostModel> {
    const post: PostModel = await this.postsRepository.readOne({ id: args.input.postId })

    if (!post.isOwnedByUser(args.user)) {
      throw new UnauthorizedException()
    }

    const updatedPost: PostModel = await this.postsRepository.updateOne({
      content: args.input.content,
      id: args.input.postId,
      title: args.input.title
    })

    return updatedPost
  }

  public async readMany(): Promise<Array<PostModel>> {
    return this.postsRepository.readMany()
  }

  public async readAllByUserId(args: ReadAllByUserIdArgs): Promise<Array<PostModel>> {
    const mockPost: PostModel = new PostModel()
    mockPost.content = `As i have heared you, so you must forget one another. Always confidently realize the one spirit.`
    mockPost.id = 1
    mockPost.title = `The pit is full of thought. By user #${args.id}.`
    mockPost.votes = 5

    return [mockPost]
  }
}
