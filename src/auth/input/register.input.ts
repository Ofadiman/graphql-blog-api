import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, Length } from 'class-validator'

import { UserConstraints } from '../../users/user.constraints'
import { UserDescriptions } from '../../users/user.descriptions'

@InputType({ description: RegisterInput.DESCRIPTION })
export class RegisterInput {
  public static DESCRIPTION: string = `Input used to create the user.`

  @Field((): typeof String => String, { description: UserDescriptions.EMAIL })
  @IsEmail()
  @Length(UserConstraints.MIN_EMAIL_LENGTH, UserConstraints.MAX_EMAIL_LENGTH)
  public email: string

  @Field((): typeof String => String, {
    description: UserDescriptions.PASSWORD
  })
  @Length(UserConstraints.MIN_PASSWORD_LENGTH, UserConstraints.MAX_PASSWORD_LENGTH)
  public password: string
}
