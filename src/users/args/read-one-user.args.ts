import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsEmail, IsInt, IsOptional, IsPositive } from 'class-validator'

import { UserModel } from '../user.model'

@ArgsType()
export class ReadOneUserArgs {
  @Field((): typeof Int => Int, { description: UserModel.ID_DESCRIPTION, nullable: true })
  @IsInt()
  @IsPositive()
  @IsOptional()
  public id?: number

  @Field((): typeof String => String, { description: UserModel.ID_DESCRIPTION, nullable: true })
  @IsEmail()
  @IsOptional()
  public email?: string
}
