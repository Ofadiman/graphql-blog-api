import { ValidationPipe } from '@nestjs/common'

export class AppValidationPipe extends ValidationPipe {
  public constructor() {
    super({
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      validationError: {
        target: false,
        value: true
      }
    })
  }
}
