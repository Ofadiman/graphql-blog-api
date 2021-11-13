import { NotFoundException } from '@nestjs/common'

type UserNotFoundExceptionArgs = {
  id: number
}

export class UserNotFoundException extends NotFoundException {
  public constructor(args: UserNotFoundExceptionArgs) {
    super(`User with id "${args.id}" not found.`)
  }
}
