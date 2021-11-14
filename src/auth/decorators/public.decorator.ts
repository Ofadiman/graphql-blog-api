import { CustomDecorator, SetMetadata } from '@nestjs/common'

export const PUBLIC_KEY: string = `PUBLIC_ROUTE_KEY`

/**
 * Decorator that allows you to declare a handler as public. The public handler can be called by a non-logged-in user.
 */
export const Public = (): CustomDecorator => SetMetadata(PUBLIC_KEY, true)
