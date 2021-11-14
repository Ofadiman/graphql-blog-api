import { Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'

import { ReadOneUserArgs } from './args/read-one-user.args'
import { CreateOneUserInput } from './inputs/create-one-user.input'
import { User } from './user.model'

const isString = (value: unknown): value is string => {
  return typeof value === `string`
}

@Injectable()
export class UsersRepository {
  public constructor(@InjectKnex() private readonly knex: Knex) {}

  public async createOne(args: CreateOneUserInput): Promise<User> {
    const [user]: Array<User> = await this.knex.table<User>(User.TABLE_NAME).insert(args).returning(`*`)

    return plainToClass(User, user)
  }

  public async readOne(args: ReadOneUserArgs): Promise<User | undefined> {
    const queryBuilder: Knex.QueryBuilder<User, Array<User>> = this.knex.table<User>(User.TABLE_NAME).select(`*`)

    for (const [key, value] of Object.entries(args)) {
      if (isString(value)) {
        void queryBuilder.where(key, value)
      }
    }

    const [user]: Array<User> = await queryBuilder

    return user
  }
}
