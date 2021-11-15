import { Injectable } from '@nestjs/common'

import { CreateOnePostInput } from './inputs/create-one-post.input'
import { Post } from './post.model'
import { PostsRepository } from './posts.repository'

export type ReadAllByUserIdArgs = {
  id: number
}

@Injectable()
export class PostsService {
  public constructor(private readonly postsRepository: PostsRepository) {}

  public async createOne(input: CreateOnePostInput & { userId: number }): Promise<Post> {
    return this.postsRepository.createOne(input)
  }

  public async readMany(): Promise<Array<Post>> {
    return this.postsRepository.readMany()
  }

  public async readAllByUserId(args: ReadAllByUserIdArgs): Promise<Array<Post>> {
    const mockPost: Post = new Post()
    mockPost.content = `As i have heared you, so you must forget one another. Always confidently realize the one spirit.`
    mockPost.id = 1
    mockPost.title = `The pit is full of thought. By user #${args.id}.`
    mockPost.votes = 5

    return [mockPost]
  }
}
