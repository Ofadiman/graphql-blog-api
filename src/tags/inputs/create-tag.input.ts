import { Field, InputType, ReturnTypeFuncValue } from '@nestjs/graphql'
import { IsString, Length } from 'class-validator'

import { TagConstraints } from '../tag.constraints'
import { TagDescriptions } from '../tag.descriptions'

@InputType({ description: CreateTagInput.DESCRIPTION })
export class CreateTagInput {
  public static DESCRIPTION: string = `Input used to create a tag.`

  @Field((): ReturnTypeFuncValue => String, { description: TagDescriptions.NAME })
  @IsString()
  @Length(TagConstraints.MIN_NAME_LENGTH, TagConstraints.MAX_NAME_LENGTH)
  public name: string
}
