import { Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'

import { CreateOneUserInput } from './inputs/create-one-user.input'
import { User } from './user.model'

@Injectable()
export class UsersRepository {
  public constructor(@InjectKnex() private readonly knex: Knex) {}

  public async createOne(args: CreateOneUserInput): Promise<User> {
    const [user]: Array<User> = await this.knex.table<User>(User.TABLE_NAME).insert(args).returning(`*`)

    return plainToClass(User, user)
  }
}
