export class PostRecord {
  public static TABLE_NAME: string = `posts`

  public content: string
  public id: number
  public title: string
  public user_id: number
  public votes: number | null
}
