import { UserConstraints } from './user.constraints'

export class UserDescriptions {
  public static MODEL: string = `A model that represents the user of the application.`

  public static EMAIL: string = `E-mail address.`
  public static ID: string = `An identifier that identifies a unique user.`
  public static PASSWORD: string = `User Password. Password length must be greater than ${UserConstraints.MIN_PASSWORD_LENGTH} and less than ${UserConstraints.MAX_PASSWORD_LENGTH} characters.`
  public static POSTS: string = `Posts that were written by the selected user.`
}
