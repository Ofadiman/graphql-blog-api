import { Args, Mutation, Resolver, ReturnTypeFuncValue } from '@nestjs/graphql'
import { GraphQLVoid } from 'graphql-scalars'

import { AuthService } from './auth.service'
import { Public } from './decorators/public.decorator'
import { LoginInput } from './input/login.input'
import { RegisterInput } from './input/register.input'
import { LoginResponse } from './objects/login.object'

@Resolver()
export class AuthResolver {
  public constructor(private readonly authService: AuthService) {}

  @Mutation((): ReturnTypeFuncValue => LoginResponse, { description: `A mutation that logs in a user.` })
  @Public()
  public async login(
    @Args({ description: LoginInput.DESCRIPTION, name: LoginInput.name }) loginInput: LoginInput
  ): Promise<LoginResponse> {
    return this.authService.login(loginInput)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Mutation((): ReturnTypeFuncValue => GraphQLVoid, {
    description: `A mutation that registers a new user in the application.`,
    nullable: true
  })
  @Public()
  public async registerUser(
    @Args({ description: RegisterInput.DESCRIPTION, name: RegisterInput.name })
    registerUserInput: RegisterInput
  ): Promise<void> {
    await this.authService.registerUser(registerUserInput)
  }
}
