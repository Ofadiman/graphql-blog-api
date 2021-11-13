import { Injectable } from '@nestjs/common'

import { User } from './user.model'

type ReadOneByIdArgs = {
  id: number
}

@Injectable()
export class UsersService {
  public async readOneById(args: ReadOneByIdArgs): Promise<User> {
    const mockUser: User = new User()

    mockUser.id = args.id
    mockUser.posts = []

    return mockUser
  }
}
