import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: `A model that represents posts added by a user.` })
export class Post {
  @Field((): typeof Int => Int, { description: `An identifier that identifies a unique user.` })
  public id: number

  @Field({ description: `Post title. The post title is unique across the application.` })
  public title: string

  @Field((): typeof Int => Int, {
    description: `The number of votes that were cast for the selected post by the users of the application.`,
    nullable: true
  })
  public votes: number | null
}
