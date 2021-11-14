import { NotFoundException } from '@nestjs/common'

type UserNotFoundExceptionArgs = {
  email?: string
  id?: number
}

export class UserNotFoundException extends NotFoundException {
  public constructor(args: UserNotFoundExceptionArgs) {
    super(`User with id "${JSON.stringify(args)}" not found.`)
  }
}
