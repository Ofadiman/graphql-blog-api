import { Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'

import { GuardsService } from '../core/providers/guards.service'
import { ReadOneUserArgs } from './args/read-one-user.args'
import { UserModel } from './user.model'
import { UserRecord } from './user.record'

type CreateOneArgs = {
  email: string
  password: string
}

@Injectable()
export class UsersRepository {
  public constructor(@InjectKnex() private readonly knex: Knex, private readonly guardsService: GuardsService) {}

  public async createOne(args: CreateOneArgs, transaction?: Knex.Transaction): Promise<UserModel> {
    const queryRunner: Knex = transaction ?? this.knex

    const [user]: Array<UserRecord> = await queryRunner
      .table<UserRecord>(UserModel.TABLE_NAME)
      .insert(args)
      .returning(`*`)

    return plainToClass(UserModel, user)
  }

  public async readOne(args: ReadOneUserArgs): Promise<UserModel | undefined> {
    const queryBuilder: Knex.QueryBuilder<UserRecord, Array<UserRecord>> = this.knex
      .table<UserRecord>(UserModel.TABLE_NAME)
      .select(`*`)

    for (const [key, value] of Object.entries(args)) {
      if (this.guardsService.isString(value)) {
        void queryBuilder.where(key, value)
      }
    }

    const [user]: Array<UserRecord> = await queryBuilder

    return plainToClass(UserModel, user)
  }

  public async readManyByIds(ids: Readonly<Array<number>>): Promise<Array<UserModel>> {
    const users: Array<UserRecord> = await this.knex
      .table<UserRecord>(UserModel.TABLE_NAME)
      .select(`*`)
      .whereIn(`id`, ids)

    return users.map((user: UserRecord): UserModel => plainToClass(UserModel, user))
  }
}
