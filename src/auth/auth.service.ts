import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { BcryptService } from '../core/providers/bcrypt.service'
import { User } from '../users/user.model'
import { UsersService } from '../users/users.service'
import { LoginInput } from './input/login.input'
import { RegisterInput } from './input/register.input'
import { LoginResponse } from './objects/login.object'

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService
  ) {}

  public async login(args: LoginInput): Promise<LoginResponse> {
    const user: User = await this.usersService.readOne({ email: args.email })

    const didPasswordMatch: boolean = await this.bcryptService.compare({
      encrypted: user.password,
      plain: args.password
    })
    if (!didPasswordMatch) {
      throw new UnauthorizedException()
    }

    const token: string = await this.jwtService.signAsync({ user })

    return { token }
  }

  public async registerUser(args: RegisterInput): Promise<User> {
    const hashedPassword: string = await this.bcryptService.hash(args.password)

    const user: User = await this.usersService.createOne({
      email: args.email,
      password: hashedPassword
    })

    return user
  }
}
