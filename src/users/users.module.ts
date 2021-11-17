import { forwardRef, Module } from '@nestjs/common'

import { CoreModule } from '../core/core.module'
import { PostsModule } from '../posts/posts.module'
import { UsersRepository } from './users.repository'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  exports: [UsersService, UsersRepository],
  imports: [forwardRef((): typeof PostsModule => PostsModule), CoreModule],
  providers: [UsersResolver, UsersService, UsersRepository]
})
export class UsersModule {}
