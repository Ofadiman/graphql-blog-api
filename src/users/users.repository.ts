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

type UserRecord = {
  email: string
  id: number
  password: string
}

@Injectable()
export class UsersRepository {
  public constructor(@InjectKnex() private readonly knex: Knex) {}

  public async createOne(args: CreateOneUserInput): Promise<User> {
    const [user]: Array<UserRecord> = await this.knex.table<UserRecord>(User.TABLE_NAME).insert(args).returning(`*`)

    return plainToClass(User, user)
  }

  public async readOne(args: ReadOneUserArgs): Promise<User | undefined> {
    const queryBuilder: Knex.QueryBuilder<UserRecord, Array<UserRecord>> = this.knex
      .table<UserRecord>(User.TABLE_NAME)
      .select(`*`)

    for (const [key, value] of Object.entries(args)) {
      if (isString(value)) {
        void queryBuilder.where(key, value)
      }
    }

    const [user]: Array<UserRecord> = await queryBuilder

    return plainToClass(User, user)
  }

  public async readManyByIds(ids: Readonly<Array<number>>): Promise<Array<User>> {
    const users: Array<UserRecord> = await this.knex.table<UserRecord>(User.TABLE_NAME).select(`*`).whereIn(`id`, ids)

    return users.map((user: UserRecord): User => plainToClass(User, user))
  }
}
