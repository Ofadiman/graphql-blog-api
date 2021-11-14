import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { User } from '../users/user.model'
import { AuthService } from './auth.service'
import { RegisterUserInput } from './input/register-user.input'

@Resolver()
export class AuthResolver {
  public constructor(private readonly authService: AuthService) {}

  @Mutation((): typeof User => User, { description: `A mutation that registers a new user in the application.` })
  public async registerUser(
    @Args({ description: RegisterUserInput.DESCRIPTION, name: RegisterUserInput.name })
    registerUserInput: RegisterUserInput
  ): Promise<User> {
    return this.authService.registerUser(registerUserInput)
  }
}
