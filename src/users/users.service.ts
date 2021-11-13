import { Injectable } from '@nestjs/common'

import { CreateOneUserInput } from './inputs/create-one-user.input'
import { User } from './user.model'
import { UsersRepository } from './users.repository'

type ReadOneByIdArgs = {
  id: number
}

@Injectable()
export class UsersService {
  public constructor(private readonly usersRepository: UsersRepository) {}

  public async readOneById(args: ReadOneByIdArgs): Promise<User> {
    const mockUser: User = new User()

    mockUser.email = `user@mock.com`
    mockUser.id = args.id
    mockUser.password = `2fnp14iug1`
    mockUser.posts = []

    return mockUser
  }

  public async createOne(args: CreateOneUserInput): Promise<User> {
    return this.usersRepository.createOne(args)
  }
}
