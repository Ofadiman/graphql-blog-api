import faker from 'faker'
import { Knex } from 'knex'

import { runIfNotInProduction } from '../utils/run-if-not-in-production'

type UserFromDatabase = {
  email: string
  id: number
  password: string
}

type PostFromDatabase = {
  content: string
  id: number
  title: string
  user_id: number
  votes: number
}

type CommentSeed = {
  content: string
  post_id: number
  user_id: number
}

export async function up(knex: Knex): Promise<void> {
  await runIfNotInProduction(async (): Promise<void> => {
    const posts: Array<PostFromDatabase> = await knex.table<PostFromDatabase>(`posts`).select(`*`)
    const users: Array<UserFromDatabase> = await knex.table<UserFromDatabase>(`users`).select(`*`)

    const comments: Array<CommentSeed> = posts
      .map((post: PostFromDatabase): Array<CommentSeed> => {
        faker.seed(post.id)

        const commentsUnderPostCount: number = faker.datatype.number({ max: 10, min: 3, precision: 1 })

        return Array.from({ length: commentsUnderPostCount })
          .fill(null)
          .map((): CommentSeed => {
            const userMakingComment: UserFromDatabase = faker.random.arrayElement(users)
            const [username]: Array<string> = userMakingComment.email.split(`@`)
            const numberOfWordsUserWantsToSay: number = faker.datatype.number({ max: 5, min: 1, precision: 1 })
            const words: string = faker.lorem.words(numberOfWordsUserWantsToSay)

            return {
              content: `Hi! My name is ${username} and I want to say a few words: ${words}.`,
              post_id: post.id,
              user_id: userMakingComment.id
            }
          })
      })
      .flat(2)

    await knex.table<CommentSeed>(`comments`).insert(comments)
  })
}

export async function down(knex: Knex): Promise<void> {
  await runIfNotInProduction(async (): Promise<void> => {
    await knex.table(`comments`).delete()
  })
}
