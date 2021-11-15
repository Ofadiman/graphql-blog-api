import { forwardRef, Module } from '@nestjs/common'

import { UsersModule } from '../users/users.module'
import { PostsRepository } from './posts.repository'
import { PostsLoaders, PostsResolver } from './posts.resolver'
import { PostsService } from './posts.service'

@Module({
  exports: [PostsService],
  imports: [forwardRef((): typeof UsersModule => UsersModule)],
  providers: [PostsLoaders, PostsService, PostsResolver, PostsRepository]
})
export class PostsModule {}
