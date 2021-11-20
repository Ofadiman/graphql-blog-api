import { Injectable } from '@nestjs/common'

import { TagModel } from './tag.model'
import { TagsRepository } from './tags.repository'

@Injectable()
export class TagsService {
  public constructor(private readonly tagsRepository: TagsRepository) {}

  public async createOne(args: { name: string }): Promise<TagModel> {
    return this.tagsRepository.createOne(args)
  }
}
