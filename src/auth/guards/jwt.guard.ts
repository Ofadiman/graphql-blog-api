import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { Observable } from 'rxjs'

import { PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class JwtGuard extends AuthGuard(`jwt`) {
  public constructor(private readonly reflector: Reflector) {
    super()
  }

  public canActivate(context: ExecutionContext): Observable<boolean> | Promise<boolean> | boolean {
    const isPublicRoute: boolean = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublicRoute) {
      return true
    }

    return super.canActivate(context)
  }

  public getRequest(context: ExecutionContext): Request {
    const gqlExecutionContext: GqlExecutionContext = GqlExecutionContext.create(context)

    return gqlExecutionContext.getContext<{ req: Request }>().req
  }
}
