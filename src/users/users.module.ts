import { Module } from '@nestjs/common'

import { PostsModule } from '../posts/posts.module'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  exports: [UsersService],
  imports: [PostsModule],
  providers: [UsersResolver, UsersService]
})
export class UsersModule {}
