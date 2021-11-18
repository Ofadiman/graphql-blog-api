import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, Length } from 'class-validator'

import { UserModel } from '../../users/user.model'

@InputType({ description: `Input needed to login to the application.` })
export class LoginInput {
  public static DESCRIPTION: string = `Input needed to login to the application.`

  @Field((): typeof String => String, { description: UserModel.EMAIL_DESCRIPTION })
  @IsEmail()
  @Length(UserModel.MIN_EMAIL_LENGTH, UserModel.MAX_EMAIL_LENGTH)
  public email: string

  @Field((): typeof String => String, {
    description: `User Password. Password length must be greater than ${UserModel.MIN_PASSWORD_LENGTH} and less than ${UserModel.MAX_PASSWORD_LENGTH} characters.`
  })
  @Length(UserModel.MIN_PASSWORD_LENGTH, UserModel.MAX_PASSWORD_LENGTH)
  public password: string
}
