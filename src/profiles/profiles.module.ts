import { Module } from '@nestjs/common'

import { ProfilesRepository } from './profiles.repository'
import { ProfilesResolver } from './profiles.resolver'
import { ProfilesService } from './profiles.service'

@Module({
  exports: [ProfilesService],
  providers: [ProfilesResolver, ProfilesService, ProfilesRepository]
})
export class ProfilesModule {}
