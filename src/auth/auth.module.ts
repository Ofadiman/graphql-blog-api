import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { CoreModule } from '../core/core.module'
import { UsersModule } from '../users/users.module'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtGuard } from './guards/jwt.guard'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    JwtModule.register({ secret: `9b431c8bac8a236fab910bfc79c6316bbd57ffc8`, signOptions: { expiresIn: `30d` } }),
    UsersModule,
    CoreModule
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, JwtGuard]
})
export class AuthModule {}
