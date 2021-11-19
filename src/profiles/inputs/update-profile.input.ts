import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsPositive, IsString, IsUrl, Length } from 'class-validator'

import { ProfileConstraints } from '../profile.constraints'
import { ProfileDescriptions } from '../profile.descriptions'

@InputType({ description: UpdateProfileInput.DESCRIPTION })
export class UpdateProfileInput {
  public static DESCRIPTION: string = `Input needed to update a user profile.`

  @IsOptional()
  @IsString()
  @Length(ProfileConstraints.BIO_MIN_LENGTH, ProfileConstraints.BIO_MAX_LENGTH)
  @Field((): typeof String => String, { description: ProfileDescriptions.BIO, nullable: true })
  public bio?: string

  @IsOptional()
  @IsUrl({ protocols: [`https`] })
  @Field((): typeof String => String, { description: ProfileDescriptions.PHOTO, nullable: true })
  public photo?: string

  @IsInt()
  @IsPositive()
  @Field((): typeof Int => Int, { description: ProfileDescriptions.ID })
  public userId: number

  @IsOptional()
  @IsString()
  @Length(ProfileConstraints.USERNAME_MIN_LENGTH, ProfileConstraints.USERNAME_MAX_LENGTH)
  @Field((): typeof String => String, { description: ProfileDescriptions.USERNAME, nullable: true })
  public username: string
}
