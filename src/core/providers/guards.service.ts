import { Injectable } from '@nestjs/common'

@Injectable()
export class GuardsService {
  public isString(value: unknown): value is string {
    return typeof value === `string`
  }

  public isNumber(value: unknown): value is number {
    return typeof value === `number`
  }
}
