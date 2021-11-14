import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsEmail, IsInt, IsOptional, IsPositive } from 'class-validator'

import { User } from '../user.model'

@ArgsType()
export class ReadOneUserArgs {
  @Field((): typeof Int => Int, { description: User.ID_DESCRIPTION })
  @IsInt()
  @IsPositive()
  @IsOptional()
  public id?: number

  @Field((): typeof Int => Int, { description: User.ID_DESCRIPTION })
  @IsEmail()
  @IsOptional()
  public email?: string
}
