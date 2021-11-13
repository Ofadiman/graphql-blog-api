import { Injectable } from '@nestjs/common'

import { Post } from './post.model'

export type ReadAllByUserIdArgs = {
  id: number
}

@Injectable()
export class PostsService {
  public async readAllByUserId(args: ReadAllByUserIdArgs): Promise<Array<Post>> {
    const mockPost: Post = new Post()
    mockPost.content = `As i have heared you, so you must forget one another. Always confidently realize the one spirit.`
    mockPost.id = 1
    mockPost.title = `The pit is full of thought. By user #${args.id}.`
    mockPost.votes = 5

    return [mockPost]
  }
}
