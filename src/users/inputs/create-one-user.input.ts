import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, Length } from 'class-validator'

import { UserConstraints } from '../user.constraints'
import { UserDescriptions } from '../user.descriptions'

@InputType({ description: CreateOneUserInput.DESCRIPTION })
export class CreateOneUserInput {
  public static DESCRIPTION: string = `Input used to create the user.`

  @Field((): typeof String => String, { description: UserDescriptions.EMAIL })
  @IsEmail()
  @Length(UserConstraints.MIN_EMAIL_LENGTH, UserConstraints.MAX_EMAIL_LENGTH)
  public email: string

  @Field((): typeof String => String, {
    description: `User Password. Password length must be greater than ${UserConstraints.MIN_PASSWORD_LENGTH} and less than ${UserConstraints.MAX_PASSWORD_LENGTH} characters.`
  })
  @Length(UserConstraints.MIN_PASSWORD_LENGTH, UserConstraints.MAX_PASSWORD_LENGTH)
  public password: string
}
