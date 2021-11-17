import { Injectable } from '@nestjs/common'

@Injectable()
export class GuardsService {
  public isString(value: unknown): value is string {
    return typeof value === `string`
  }
}
