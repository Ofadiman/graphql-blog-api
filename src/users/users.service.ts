import { Injectable } from '@nestjs/common'

import { ReadOneUserArgs } from './args/read-one-user.args'
import { UserNotFoundException } from './exceptions/user-not-found.exception'
import { CreateOneUserInput } from './inputs/create-one-user.input'
import { User } from './user.model'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
  public constructor(private readonly usersRepository: UsersRepository) {}

  public async readOne(args: ReadOneUserArgs): Promise<User> {
    const user: User | undefined = await this.usersRepository.readOne(args)

    if (user === undefined) {
      throw new UserNotFoundException(args)
    }

    return user
  }

  public async createOne(args: CreateOneUserInput): Promise<User> {
    return this.usersRepository.createOne(args)
  }

  public async readManyByIds(ids: Readonly<Array<number>>): Promise<Array<User>> {
    return this.usersRepository.readManyByIds(ids)
  }
}
