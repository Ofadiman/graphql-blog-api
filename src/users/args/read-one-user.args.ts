import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsEmail, IsInt, IsOptional, IsPositive } from 'class-validator'

import { User } from '../user.model'

@ArgsType()
export class ReadOneUserArgs {
  @Field((): typeof Int => Int, { description: User.ID_DESCRIPTION, nullable: true })
  @IsInt()
  @IsPositive()
  @IsOptional()
  public id?: number

  @Field((): typeof String => String, { description: User.ID_DESCRIPTION, nullable: true })
  @IsEmail()
  @IsOptional()
  public email?: string
}
