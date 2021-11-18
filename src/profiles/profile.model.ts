import { Field, Int, ObjectType } from '@nestjs/graphql'

import { ProfileDescriptions } from './profile.descriptions'

@ObjectType({ description: ProfileDescriptions.MODEL })
export class ProfileModel {
  @Field((): typeof Int => Int, { description: ProfileDescriptions.ID })
  public id: number

  @Field((): typeof String => String, { description: ProfileDescriptions.BIO })
  public bio: string

  @Field((): typeof String => String, { description: ProfileDescriptions.PHOTO })
  public photo: string

  @Field((): typeof String => String, { description: ProfileDescriptions.USERNAME })
  public username: string
}
