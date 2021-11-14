import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { BcryptService } from '../core/utils/providers/bcrypt.service'
import { UsersModule } from '../users/users.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
  imports: [JwtModule.register({ secret: `hard!to-guess_secret`, signOptions: { expiresIn: `30d` } }), UsersModule],
  providers: [AuthResolver, AuthService, BcryptService]
})
export class AuthModule {}
