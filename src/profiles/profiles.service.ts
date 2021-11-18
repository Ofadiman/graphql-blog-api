import { Injectable } from '@nestjs/common'

import { ProfileModel } from './profile.model'
import { ProfilesRepository } from './profiles.repository'

type CreateOne = {
  bio: string
  photo: string
  userId: number
  username: string
}
type GetProfileByUserIdArgs = {
  id: number
}

@Injectable()
export class ProfilesService {
  public constructor(private readonly profilesRepository: ProfilesRepository) {}

  public async createOne(args: CreateOne): Promise<ProfileModel> {
    return this.profilesRepository.createOne(args)
  }

  public async getProfileByUserId(args: GetProfileByUserIdArgs): Promise<ProfileModel> {
    return this.profilesRepository.readOne(args)
  }
}
