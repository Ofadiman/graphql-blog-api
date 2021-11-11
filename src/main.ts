import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

void (async function bootstrap(): Promise<void> {
  const nestApplication: INestApplication = await NestFactory.create(AppModule)

  await nestApplication.listen(3_000)
})()
