import { forwardRef, Module } from '@nestjs/common'

import { PostsModule } from '../posts/posts.module'
import { UsersRepository } from './users.repository'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  exports: [UsersService, UsersRepository],
  imports: [forwardRef((): typeof PostsModule => PostsModule)],
  providers: [UsersResolver, UsersService, UsersRepository]
})
export class UsersModule {}
