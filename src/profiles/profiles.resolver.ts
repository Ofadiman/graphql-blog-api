import { Args, Mutation, Resolver, ReturnTypeFuncValue } from '@nestjs/graphql'

import { UpdateProfileInput } from './inputs/update-profile.input'
import { ProfileModel } from './profile.model'
import { ProfilesService } from './profiles.service'
import { UpdateProfileResponse } from './responses/update-profile.response'

@Resolver((): typeof ProfileModel => ProfileModel)
export class ProfilesResolver {
  public constructor(private readonly profilesService: ProfilesService) {}

  @Mutation((): ReturnTypeFuncValue => UpdateProfileResponse, {
    description: `A mutation that allows to update user profile.`
  })
  public async updateProfile(
    @Args({
      description: UpdateProfileInput.DESCRIPTION,
      name: UpdateProfileInput.name
    })
    updateProfileInput: UpdateProfileInput
  ): Promise<ProfileModel> {
    return this.profilesService.updateOne(updateProfileInput)
  }
}
