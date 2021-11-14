import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class LoginResponse {
  @Field((): typeof String => String, { description: `The token used for user authentication.` })
  public token: string
}
