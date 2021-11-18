import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { BcryptService } from '../core/providers/bcrypt.service'
import { ProfileModel } from '../profiles/profile.model'
import { ProfilesService } from '../profiles/profiles.service'
import { UserModel } from '../users/user.model'
import { UsersService } from '../users/users.service'
import { LoginInput } from './input/login.input'
import { RegisterInput } from './input/register.input'
import { LoginResponse } from './objects/login.object'

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly profilesService: ProfilesService
  ) {}

  public async login(args: LoginInput): Promise<LoginResponse> {
    const user: UserModel = await this.usersService.readOne({ email: args.email })

    const didPasswordMatch: boolean = await this.bcryptService.compare({
      encrypted: user.password,
      plain: args.password
    })
    if (!didPasswordMatch) {
      throw new UnauthorizedException()
    }

    const token: string = await this.jwtService.signAsync({ userId: user.id })

    const profile: ProfileModel = await this.profilesService.getProfileByUserId({ id: user.id })

    return { profile, token, user }
  }

  public async registerUser(args: RegisterInput): Promise<void> {
    const hashedPassword: string = await this.bcryptService.hash(args.password)

    const userModel: UserModel = await this.usersService.createOne({
      email: args.email,
      password: hashedPassword
    })

    const [baseUserName]: Array<string> = args.email.split(`@`)
    await this.profilesService.createOne({
      bio: `Your bio should be here.`,
      photo: `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`,
      userId: userModel.id,
      username: baseUserName
    })
  }
}
