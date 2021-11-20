import { Args, Mutation, Resolver, ReturnTypeFuncValue } from '@nestjs/graphql'

import { CreateTagInput } from './inputs/create-tag.input'
import { TagModel } from './tag.model'
import { TagsService } from './tags.service'

@Resolver((): typeof TagModel => TagModel)
export class TagsResolver {
  public constructor(private readonly tagsService: TagsService) {}

  @Mutation((): ReturnTypeFuncValue => TagModel, { description: `A mutation that creates a tag.` })
  public async createTag(
    @Args({ description: CreateTagInput.DESCRIPTION, name: CreateTagInput.name }) input: CreateTagInput
  ): Promise<TagModel> {
    return this.tagsService.createOne(input)
  }
}
