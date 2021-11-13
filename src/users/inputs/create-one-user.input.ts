import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, Length } from 'class-validator'

import { User } from '../user.model'

@InputType({ description: `Input needed to create a user.` })
export class CreateOneUserInput {
  public static DESCRIPTION: string = `Input used to create the user.`

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
