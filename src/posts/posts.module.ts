import { Module } from '@nestjs/common'

import { PostsService } from './posts.service'

@Module({
  exports: [PostsService],
  providers: [PostsService]
})
export class PostsModule {}
