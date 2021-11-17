import { Module } from '@nestjs/common'

import { BcryptService } from './providers/bcrypt.service'
import { GuardsService } from './providers/guards.service'

@Module({
  exports: [BcryptService, GuardsService],
  providers: [BcryptService, GuardsService]
})
export class CoreModule {}
