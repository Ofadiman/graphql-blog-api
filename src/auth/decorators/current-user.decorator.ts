import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Request } from 'express'

import { User } from '../../users/user.model'

export type UserRequest = {
  req: Request & { user: User }
}

export const CurrentUser: (...dataOrPipes: Array<unknown>) => ParameterDecorator = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User => {
    if (context.getType() === `http`) {
      return context.switchToHttp().getRequest<UserRequest['req']>().user
    }

    const gqlExecutionContext: GqlExecutionContext = GqlExecutionContext.create(context)

    return gqlExecutionContext.getContext<UserRequest>().req.user
  }
)
