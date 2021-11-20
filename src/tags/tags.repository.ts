import { Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'

import { TagModel } from './tag.model'
import { TagRecord } from './tag.record'

@Injectable()
export class TagsRepository {
  public constructor(@InjectKnex() private readonly knex: Knex) {}

  public async createOne(args: { name: string }): Promise<TagModel> {
    const [tag]: Array<TagRecord> = await this.knex
      .table<TagRecord>(TagRecord.TABLE_NAME)
      .insert({ name: args.name })
      .returning(`*`)

    return plainToClass(TagModel, tag)
  }
}
