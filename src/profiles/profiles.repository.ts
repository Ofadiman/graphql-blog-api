import { Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'

import { ProfileModel } from './profile.model'
import { ProfileRecord } from './profile.record'

type CreateOneArgs = {
  bio: string
  photo: string
  userId: number
  username: string
}
type UpdateOneArgs = {
  bio?: string
  photo?: string
  userId: number
  username?: string
}

type ReadOneArgs = {
  id: number
}

@Injectable()
export class ProfilesRepository {
  public constructor(@InjectKnex() private readonly knex: Knex) {}

  public async createOne(args: CreateOneArgs, transaction?: Knex.Transaction): Promise<ProfileModel> {
    const queryRunner: Knex = transaction ?? this.knex
    const { userId: user_id, ...rest }: CreateOneArgs = args

    const [profile]: Array<ProfileRecord> = await queryRunner
      .table<ProfileRecord>(ProfileRecord.TABLE_NAME)
      .insert({ user_id, ...rest })
      .returning(`*`)

    return plainToClass(ProfileModel, profile)
  }

  public async readOne(args: ReadOneArgs): Promise<ProfileModel> {
    const [profileRecord]: Array<ProfileRecord> = await this.knex
      .table<ProfileRecord>(ProfileRecord.TABLE_NAME)
      .select(`*`)
      .where({ user_id: args.id })

    return plainToClass(ProfileModel, profileRecord)
  }

  public async updateOne(args: UpdateOneArgs): Promise<ProfileModel> {
    const { userId, ...rest }: UpdateOneArgs = args

    const [profileRecord]: Array<ProfileRecord> = await this.knex
      .table<ProfileRecord>(ProfileRecord.TABLE_NAME)
      .update(rest)
      .where({ user_id: userId })
      .returning(`*`)

    return plainToClass(ProfileModel, profileRecord)
  }
}
