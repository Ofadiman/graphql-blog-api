import { Module } from '@nestjs/common'

import { PostsRepository } from './posts.repository'
import { PostsResolver } from './posts.resolver'
import { PostsService } from './posts.service'

@Module({
  exports: [PostsService],
  providers: [PostsService, PostsResolver, PostsRepository]
})
export class PostsModule {}
