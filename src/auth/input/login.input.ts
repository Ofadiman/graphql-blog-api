import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, Length } from 'class-validator'

import { UserConstraints } from '../../users/user.constraints'
import { UserDescriptions } from '../../users/user.descriptions'

@InputType({ description: LoginInput.DESCRIPTION })
export class LoginInput {
  public static DESCRIPTION: string = `Input needed to login to the application.`

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
