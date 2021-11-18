import { Injectable } from '@nestjs/common'

import { ReadOneUserArgs } from './args/read-one-user.args'
import { UserNotFoundException } from './exceptions/user-not-found.exception'
import { CreateOneUserInput } from './inputs/create-one-user.input'
import { UserModel } from './user.model'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
  public constructor(private readonly usersRepository: UsersRepository) {}

  public async readOne(args: ReadOneUserArgs): Promise<UserModel> {
    const user: UserModel | undefined = await this.usersRepository.readOne(args)

    if (user === undefined) {
      throw new UserNotFoundException(args)
    }

    return user
  }

  public async createOne(args: CreateOneUserInput): Promise<UserModel> {
    const user: UserModel = await this.usersRepository.createOne(args)

    return user
  }

  public async readManyByIds(ids: Readonly<Array<number>>): Promise<Array<UserModel>> {
    return this.usersRepository.readManyByIds(ids)
  }
}
