import { Field, ObjectType } from '@nestjs/graphql'

import { TagDescriptions } from './tag.descriptions'

@ObjectType({ description: TagDescriptions.MODEL })
export class TagModel {
  @Field({ description: TagDescriptions.ID })
  public id: number

  @Field({ description: TagDescriptions.NAME })
  public name: string
}
