import { ObjectType } from '@nestjs/graphql'

import { ProfileModel } from '../profile.model'

@ObjectType()
export class UpdateProfileResponse extends ProfileModel {}
