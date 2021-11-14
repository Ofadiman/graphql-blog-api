import { Module } from '@nestjs/common'

import { BcryptService } from './providers/bcrypt.service'

@Module({
  exports: [BcryptService],
  providers: [BcryptService]
})
export class CoreModule {}
