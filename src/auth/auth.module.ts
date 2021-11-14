import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { CoreModule } from '../core/core.module'
import { UsersModule } from '../users/users.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
  imports: [
    JwtModule.register({ secret: `hard!to-guess_secret`, signOptions: { expiresIn: `30d` } }),
    UsersModule,
    CoreModule
  ],
  providers: [AuthResolver, AuthService]
})
export class AuthModule {}
