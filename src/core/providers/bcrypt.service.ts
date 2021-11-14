import { Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'

@Injectable()
export class BcryptService {
  public static SALT_ROUNDS: number = 12

  public async hash(args: Buffer | string): Promise<string> {
    const hash: string = await bcrypt.hash(args, BcryptService.SALT_ROUNDS)

    return hash
  }
}
