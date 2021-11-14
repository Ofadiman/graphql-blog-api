import { Args, Mutation, Resolver, ReturnTypeFuncValue } from '@nestjs/graphql'
import { GraphQLVoid } from 'graphql-scalars'

import { User } from '../users/user.model'
import { AuthService } from './auth.service'
import { LoginInput } from './input/login.input'
import { RegisterInput } from './input/register.input'
import { LoginResponse } from './objects/login.object'

@Resolver()
export class AuthResolver {
  public constructor(private readonly authService: AuthService) {}

  @Mutation((): ReturnTypeFuncValue => LoginResponse, { description: `A mutation that logs in a user.` })
  public async login(
    @Args({ description: LoginInput.DESCRIPTION, name: LoginInput.name }) loginInput: LoginInput
  ): Promise<LoginResponse> {
    return this.authService.login(loginInput)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Mutation((): ReturnTypeFuncValue => GraphQLVoid, {
    description: `A mutation that registers a new user in the application.`
  })
  public async registerUser(
    @Args({ description: RegisterInput.DESCRIPTION, name: RegisterInput.name })
    registerUserInput: RegisterInput
  ): Promise<User> {
    return this.authService.registerUser(registerUserInput)
  }
}
