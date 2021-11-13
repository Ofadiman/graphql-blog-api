import { Injectable } from '@nestjs/common'

import { Post } from './post.model'

export type ReadAllByUserIdArgs = {
  id: number
}

@Injectable()
export class PostsService {
  public async readAllByUserId(args: ReadAllByUserIdArgs): Promise<Array<Post>> {
    const mockPost: Post = new Post()
    mockPost.id = 1
    mockPost.votes = 5
    mockPost.title = `The pit is full of thought. By user #${args.id}.`

    return [mockPost]
  }
}
