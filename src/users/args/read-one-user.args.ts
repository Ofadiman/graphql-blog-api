import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsInt, IsPositive } from 'class-validator'

import { User } from '../user.model'

@ArgsType()
export class ReadOneUserArgs {
  @Field((): typeof Int => Int, { description: User.ID_DESCRIPTION })
  @IsInt()
  @IsPositive()
  public id: number
}
