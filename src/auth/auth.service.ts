import { Injectable } from '@nestjs/common'

import { BcryptService } from '../core/utils/providers/bcrypt.service'
import { User } from '../users/user.model'
import { UsersRepository } from '../users/users.repository'
import { RegisterUserInput } from './input/register-user.input'

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersRepository: UsersRepository,
    private readonly bcryptService: BcryptService
  ) {}

  public async registerUser(args: RegisterUserInput): Promise<User> {
    const hashedPassword: string = await this.bcryptService.hash(args.password)

    const user: User = await this.usersRepository.createOne({
      email: args.email,
      password: hashedPassword
    })

    return user
  }
}
