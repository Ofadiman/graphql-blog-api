import { Injectable } from '@nestjs/common'
import { Knex } from 'knex'

import { ProfileModel } from './profile.model'
import { ProfilesRepository } from './profiles.repository'

type CreateOneArgs = {
  bio: string
  photo: string
  userId: number
  username: string
}
type GetProfileByUserIdArgs = {
  id: number
}

type UpdateOneArgs = {
  bio?: string
  photo?: string
  userId: number
  username?: string
}

@Injectable()
export class ProfilesService {
  public constructor(private readonly profilesRepository: ProfilesRepository) {}

  public async createOne(args: CreateOneArgs, transaction?: Knex.Transaction): Promise<ProfileModel> {
    return this.profilesRepository.createOne(args, transaction)
  }

  public async getProfileByUserId(args: GetProfileByUserIdArgs): Promise<ProfileModel> {
    return this.profilesRepository.readOne(args)
  }

  public async updateOne(args: UpdateOneArgs): Promise<ProfileModel> {
    return this.profilesRepository.updateOne(args)
  }
}
