import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsEmail, IsInt, IsOptional, IsPositive } from 'class-validator'

import { UserDescriptions } from '../user.descriptions'

@ArgsType()
export class ReadOneUserArgs {
  @Field((): typeof Int => Int, { description: UserDescriptions.ID, nullable: true })
  @IsInt()
  @IsPositive()
  @IsOptional()
  public id?: number

  @Field((): typeof String => String, { description: UserDescriptions.EMAIL, nullable: true })
  @IsEmail()
  @IsOptional()
  public email?: string
}
