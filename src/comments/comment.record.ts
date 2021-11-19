export class CommentRecord {
  public static TABLE_NAME: string = `comments`

  public content: string
  public id: number

  public post_id: number
  public user_id: number
}
