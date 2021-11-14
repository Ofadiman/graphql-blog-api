import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, Length } from 'class-validator'

import { User } from '../../users/user.model'

@InputType({ description: `Input needed to login to the application.` })
export class LoginInput {
  public static DESCRIPTION: string = `Input needed to login to the application.`

  @Field((): typeof String => String, { description: User.EMAIL_DESCRIPTION })
  @IsEmail()
  @Length(User.MIN_EMAIL_LENGTH, User.MAX_EMAIL_LENGTH)
  public email: string

  @Field((): typeof String => String, {
    description: `User Password. Password length must be greater than ${User.MIN_PASSWORD_LENGTH} and less than ${User.MAX_PASSWORD_LENGTH} characters.`
  })
  @Length(User.MIN_PASSWORD_LENGTH, User.MAX_PASSWORD_LENGTH)
  public password: string
}
