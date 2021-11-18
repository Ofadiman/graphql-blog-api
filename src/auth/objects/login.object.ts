import { Field, ObjectType, PickType } from '@nestjs/graphql'

import { ProfileModel } from '../../profiles/profile.model'
import { UserModel } from '../../users/user.model'

@ObjectType({ isAbstract: true })
class User extends PickType(UserModel, [`id`, `email`]) {}

@ObjectType({ isAbstract: true })
class Profile extends PickType(ProfileModel, [`id`, `photo`, `username`, `bio`]) {}

@ObjectType()
export class LoginResponse {
  @Field((): typeof String => String, { description: `The token used for user authentication.` })
  public token: string

  @Field((): typeof User => User, { description: `A partial user returned upon successful login.` })
  public user: User

  @Field((): typeof Profile => Profile, { description: `A partial user profile returned upon successful login.` })
  public profile: Profile
}
