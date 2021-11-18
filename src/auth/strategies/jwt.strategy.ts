import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { UserModel } from '../../users/user.model'
import { UsersService } from '../../users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, `jwt`) {
  public constructor(private readonly usersService: UsersService) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `9b431c8bac8a236fab910bfc79c6316bbd57ffc8`
    })
  }

  public async validate(payload: { user: UserModel }): Promise<UserModel> {
    const user: UserModel = await this.usersService.readOne({ id: payload.user.id })

    return user
  }
}
